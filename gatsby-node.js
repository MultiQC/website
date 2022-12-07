const path = require('path');
const { toKebabCase } = require('./src/utils/toKebabCase');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = [
    `
      type MetaFields implements Node {
        title: String
        description: String
        image: File @fileByRelativePath
      }
    `,
    `
      type Module implements Node {
        slug: String
        title: String
        description: String
        url: String
        content: Mdx
      }
    `,
  ];

  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  const moduleTemplate = path.resolve('src/templates/module.jsx');

  const result = await graphql(`
    {
      modules: allModule {
        nodes {
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Build failed while running GraphQL query.');
    return;
  }

  const modules = result.data.modules.nodes;

  modules.forEach(node => {
    createPage({
      path: node.slug,
      component: moduleTemplate,
      context: {
        slug: node.slug,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNodeField, createNode } = actions;

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent);

    if (parent.internal.type === 'File') {
      createNodeField({
        name: 'sourceName',
        node,
        value: parent.sourceInstanceName,
      });
    }

    if (parent.internal.type === 'File' && parent.sourceInstanceName === 'repoModules') {
      const slug = `/modules/${toKebabCase(node.frontmatter.Name)}`;

      const content = {
        slug: slug,
        title: node.frontmatter.Name,
        description: node.frontmatter.Description,
        url: node.frontmatter.URL,
        content: node,
      };

      createNode({
        id: createNodeId(`module-${node.id}`),
        parent: node.id,
        children: [],
        internal: {
          type: 'Module',
          contentDigest: createContentDigest(content),
        },
        ...content,
      });
    }
  }
};

exports.onCreateWebpackConfig = ({ actions, loaders }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.jsx$/,
          use: [loaders.js()],
        },
      ],
    },
  });
};
