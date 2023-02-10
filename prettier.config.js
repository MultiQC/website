module.exports = {
  semi: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 120,

  // pnpm support, for VSCode?
  plugins: [
    require.resolve("prettier-plugin-organize-imports"),
    require.resolve("prettier-plugin-tailwindcss"), // Must come last
  ],
  pluginSearchDirs: false,
};
