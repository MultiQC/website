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
  <Icon icon="ph:moon-bold" width="14" height="14" class={"mr-1 inline h-4 w-4 text-gray-300"} />
  <Icon icon="ph:sun-bold" class={"inline h-4 w-4 text-gray-600"} />
</button>
