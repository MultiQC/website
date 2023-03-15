<script lang="ts">
  export let snippets: {
    title: string;
    code: string;
  }[];

  const columnsClass = ["", "w-full", "w-1/2", "w-1/3", "w-1/4", "w-1/5", "w-1/6"];

  let active = 0;
</script>

<div class="">
  <div id={`snippet-${snippets[active].title}`} class="typo-small">
    <pre class="px-3 py-2 text-xs font-light">{@html snippets[active].code}</pre>
  </div>
</div>
<div class="flex w-full justify-between border-t border-blue-600 bg-gray-800">
  {#each snippets as snippet, index (snippet.title)}
    <button
      id={`snippet-btn-${snippet.title}`}
      class={columnsClass[snippets.length] +
        " typo-small px-2 py-1 text-center " +
        (index !== active
          ? "bg-gray-700 text-gray-200 hover:bg-blue-600/75 "
          : "bg-blue-600 text-gray-100")}
      on:click={() => {
        active = index;
      }}
    >
      <code class="text-xs">{snippet.title}</code>
    </button>
  {/each}
</div>
