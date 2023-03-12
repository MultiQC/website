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

<nav class="mobile-toc text-gray-600 dark:text-gray-400" class:hidden={headings.length <= 1}>
  <button
    class="mx-2 mr-px rounded-sm border border-gray-500 bg-black bg-opacity-20 py-0.5 px-3 font-body text-xs font-light tracking-wide text-gray-300 hover:bg-opacity-50 hover:text-white"
    type="button"
    on:click={toggleVisible}
  >
    On this page
    <Icon
      icon="mdi:chevron-right"
      class={"inline-block transition-transform " + (visible ? "rotate-90" : "")}
    />
  </button>
  {#if visible}
    <div class="absolute top-16 left-0 h-[calc(100vh-4rem)] w-full overflow-y-auto px-3 py-2">
      <ul class="toc rounded-sm border border-gray-600 bg-gray-800 py-1">
        {#each headings as heading (heading)}
          <li class:active={heading.slug === $currentHeading}>
            <a
              class="block py-1 px-2 text-gray-400 hover:bg-blue-600/[0.2] hover:text-gray-200"
              href={"#" + heading.slug}
              on:click={() => {
                currentHeading.set(heading.slug);
              }}
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
