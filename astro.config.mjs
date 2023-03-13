import { defineConfig } from "astro/config";
import urls from "rehype-urls";

import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify/functions";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import yaml from "@rollup/plugin-yaml";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import calloutsPlugin from "./plugins/remark-callouts.js";
const AnchorLinkIcon = h(
  "svg",
  {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    xlmns: "http://www.w3.org/2000/svg",
  },
  h("path", {
    fillRule: "evenodd",
    fill: "currentcolor",
    d: "M10.59 13.41c.41.39.41 1.03 0 1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24a2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24a2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24a.973.973 0 0 1 0-1.42Z",
  })
);

// https://astro.build/config
export default defineConfig({
  site: "https://multiqc.info",
  output: "server",
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    mdx(),
    prefetch(),
    sitemap(),
    svelte(),
  ],
  vite: {
    plugins: [yaml()],
  },
  markdown: {
    remarkPlugins: [remarkDirective, calloutsPlugin],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: h(
            `span.anchor-icon`,
            {
              ariaHidden: "true",
              tabIndex: -1,
            },
            AnchorLinkIcon
          ),
        },
      ],
      [
        urls,
        (url) => {
          if (url.href.startsWith("../../images/")) {
            return url.href.replace("../../images/", "/docs/images/");
          }
        },
      ],
    ],
  },
  adapter: netlify(),
});
