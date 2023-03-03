<script lang="ts">
  $: theme = localStorage.getItem("theme");
  if (theme === undefined) {
    theme = "dark";
  }
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
    theme = newTheme;
  };

  // NB: Pass in SVG icons from Astro in the <slot /> so that they're fetched at build time, rather than page load
  // This fixes the flicker at page load.
</script>

<button class="rounded-full bg-gray-800 px-2 py-1" on:click={() => toggleTheme()}>
  <slot />
</button>
