import { defineConfig } from "astro/config";
import urls from "rehype-urls";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import yaml from "@rollup/plugin-yaml";

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
    rehypePlugins: [
      [
        urls,
        (url) => {
          if (url.href.startsWith("../../images/")) {
            return url.href.replace(
              "../../",
              "https://raw.githubusercontent.com/ewels/MultiQC/docs-restructure/docs/"
            );
          }
        },
      ],
    ],
  },
});
