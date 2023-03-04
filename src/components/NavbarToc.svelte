<script lang="ts">
  import { currentHeading } from "@components/store";
  import Icon from "@iconify/svelte";

  export let headings: {
    text: string;
    slug: string;
    depth: number;
  }[];

  let visible = false;
  function toggleVisible() {
    visible = !visible;
  }
</script>

<nav class="mobile-toc text-gray-600 dark:text-gray-500" class:hidden={headings.length == 0}>
  <button
    class="mx-2 mr-px rounded-sm border border-gray-500 bg-black bg-opacity-20 py-1 px-4 font-body font-light tracking-wide text-gray-300 hover:bg-opacity-50 hover:text-white"
    type="button"
    on:click={toggleVisible}
  >
    On this page
    {#if visible}
      <Icon icon="mdi:chevron-down" class="inline-block" />
    {:else}
      <Icon icon="mdi:chevron-right" class="inline-block" />
    {/if}
  </button>
  {#if visible}
    <div class="absolute top-16 left-0 h-[calc(100vh-4rem)] w-full overflow-y-auto">
      <ul class="toc bg-gray-800 py-1">
        {#each headings as heading (heading)}
          <li class:active={heading.slug === $currentHeading}>
            <a
              class="block py-1 px-2 hover:bg-blue-600/[0.2] hover:text-gray-400"
              href={"#" + heading.slug}
              on:click={toggleVisible}
            >
              {@html heading.text}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</nav>
