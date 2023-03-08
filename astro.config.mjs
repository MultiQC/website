import { defineConfig } from "astro/config";
import urls from "rehype-urls";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import yaml from "@rollup/plugin-yaml";

import remarkDirective from "remark-directive";
import calloutsPlugin from "./plugins/remark-callouts.js";

// https://astro.build/config
export default defineConfig({
  site: "https://multiqc.info",
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
});
