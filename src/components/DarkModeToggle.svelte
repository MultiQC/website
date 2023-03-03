<script lang="ts">
  import Icon from "@iconify/svelte";

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
</script>

<button class="" on:click={() => toggleTheme()}>
  <slot />
</button>
