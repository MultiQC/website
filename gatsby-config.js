const siteUrl = `https://multiqc.info/`;
const path = require("path");

module.exports = {
  siteMetadata: {
    title: `MultiQC`,
    description: `MultiQC`,
    author: `@tallphil`,
    siteUrl: siteUrl,
    image: `/images/share-image.jpg`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-plugin-image",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 100,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layout/Layout.jsx`),
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `repoModules`,
        remote: `https://github.com/ewels/MultiQC.git`,
        branch: `docs-restructure`,
        patterns: `docs/modules/**/*.md`,
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `repoDocs`,
        remote: `https://github.com/ewels/MultiQC.git`,
        branch: `docs-restructure`,
        patterns: [`docs/core/**/*.md`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `exampleReports`,
        path: `${__dirname}/src/content/example-reports`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              exclude: ["embed", "zip", "data"],
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 907,
              quality: 100,
              withWebp: true,
              ignoreFileExtensions: [],
            },
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          "gatsby-remark-external-links",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MultiQC`,
        short_name: `MultiQC`,
        start_url: `/`,
        background_color: `#27ae60`,
        theme_color: `#27ae60`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-92P10F5GQ1"],
      },
    },
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map((page) => {
            return { ...page };
          });
        },
        serialize: ({ path }) => {
          return {
            url: path,
          };
        },
      },
    },
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: siteUrl,
        stripQueryString: true,
      },
    },
  ],
};
