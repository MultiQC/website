import { defineConfig } from "astro/config";

// https://astro.build/config
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import yaml from "@rollup/plugin-yaml";
import purgecss from "astro-purgecss";

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
    purgecss(),
  ],
  vite: {
    plugins: [yaml()],
  },
});
