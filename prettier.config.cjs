module.exports = {
  semi: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  organizeImportsSkipDestructiveCodeActions: true,

  // pnpm support, for VSCode?
  plugins: [
    import("prettier-plugin-astro"),
    import("prettier-plugin-svelte"),
    import("prettier-plugin-organize-imports"),
    import("prettier-plugin-tailwindcss"), // Must come last
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  pluginSearchDirs: false,
};
