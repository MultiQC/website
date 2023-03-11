<script lang="ts">
  const icon_mdi_dots_vertical = `<svg viewBox="0 0 24 24" class="inline-block h-6 w-8" astro-icon="mdi:dots-vertical"><path fill="currentColor" d="M12 16a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z"></path></svg>`;
  const icon_mdi_close = `<svg viewBox="0 0 24 24" class="inline-block h-6 w-8" astro-icon="mdi:close"><path fill="currentColor" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg>`;

  let visible = false;
  function toggleVisible() {
    console.log("clicked");
    visible = !visible;
  }
</script>

<header
  class="typo-small mt-2 border-t border-b border-gray-700 bg-gray-800/40 py-2 text-gray-300 lg:hidden"
>
  <button class="transition-colors hover:text-gray-100" on:click={toggleVisible}>
    {@html icon_mdi_dots_vertical}
  </button>
  <slot name="title" />
</header>

{#if visible}
  <div class="fixed inset-0 z-50">
    <div class="fixed inset-0 backdrop-blur-sm" />
    <nav
      class="side-nav relative h-screen w-80 max-w-[calc(100%-3rem)] overflow-y-auto bg-gray-800 p-5 text-gray-600 dark:text-gray-400"
    >
      <button class="float-right" on:click={toggleVisible}>
        {@html icon_mdi_close}
      </button>
      <slot name="menu" />
    </nav>
  </div>
{/if}
