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

<button on:click={() => toggleTheme()}>
  {#if theme === "light"}
    <Icon icon="ph:moon-bold" class="h-6 w-6 text-gray-300" />
  {:else}
    <Icon icon="ph:sun-bold" class="h-6 w-6 text-gray-300" />
  {/if}
</button>
