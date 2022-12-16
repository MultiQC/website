const { createFilePath } = require('gatsby-source-filesystem');
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
        path: String
        title: String
        description: String
        url: String
        content: Mdx
      }
    `,
    `
      type Doc implements Node {
        slug: String
        path: String
        title: String
        description: String
        isSection: Boolean
        order: Int
        content: Mdx
      }
    `,
  ];

  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  const moduleTemplate = path.resolve('src/templates/module.jsx');
  const docTemplate = path.resolve('src/templates/doc.jsx');

  const result = await graphql(`
    {
      modules: allModule {
        nodes {
          slug
          path
        }
      }
      docs: allDoc {
        nodes {
          slug
          path
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
      path: node.path,
      component: moduleTemplate,
      context: {
        slug: node.slug,
      },
    });
  });

  const docs = result.data.docs.nodes;

  docs.forEach(node => {
    createPage({
      path: node.path,
      component: docTemplate,
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
      const slug = toKebabCase(node.frontmatter.Name);
      const path = `/modules/${slug}`;

      const content = {
        slug: slug,
        path: path,
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

    if (parent.internal.type === 'File' && parent.sourceInstanceName === 'repoDocs') {
      const slug = createFilePath({ node, getNode });
      const path = createFilePath({ node, getNode }).replace('/core', '').replace('_', '-');
      const isSection = parent.name === 'index';

      const content = {
        slug: slug,
        path: path,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
        order: node.frontmatter.order,
        isSection: isSection,
        content: node,
      }

      createNode({
        id: createNodeId(`doc-${node.id}`),
        parent: node.id,
        children: [],
        internal: {
          type: 'Doc',
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
