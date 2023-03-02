module.exports = {
  semi: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  organizeImportsSkipDestructiveCodeActions: true,

  // pnpm support, for VSCode?
  plugins: [
    require.resolve("prettier-plugin-astro"),
    require.resolve("prettier-plugin-svelte"),
    require.resolve("prettier-plugin-organize-imports"),
    require.resolve("prettier-plugin-tailwindcss"), // Must come last
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
