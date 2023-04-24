<script lang="ts">
  import { currentHeading } from "@components/store";

  // <Icon icon="mdi:chevron-right" class="inline-block" />
  const icon_chevron_right = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="inline-block iconify iconify--mdi" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42Z"></path></svg>`;

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
    class="mx-2 mr-px rounded-sm border border-gray-500 bg-black bg-opacity-20 px-3 py-0.5 font-body text-xs font-light tracking-wide text-gray-300 hover:bg-opacity-50 hover:text-white"
    type="button"
    on:click={toggleVisible}
  >
    On this page
    <span class={"inline-block transition-transform " + (visible ? "rotate-90" : "")}>
      {@html icon_chevron_right}
    </span>
  </button>
  {#if visible}
    <div class="absolute left-0 top-16 h-[calc(100vh-4rem)] w-full overflow-y-auto px-3 py-2">
      <ul class="toc rounded-sm border border-gray-600 bg-gray-800 py-1">
        {#each headings as heading (heading)}
          <li class:active={heading.slug === $currentHeading}>
            <a
              class="block px-2 py-1 text-gray-400 hover:bg-blue-600/[0.2] hover:text-gray-200"
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
