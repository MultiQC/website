<script lang="ts">

  import Highlight from "svelte-highlight";
  import bash from "svelte-highlight/languages/bash";
    import "svelte-highlight/styles/github-dark.css";

  export let snippets: {
    title: string;
    code: string;
  }[];

  const columnsClass = ["", "w-full", "w-1/2", "w-1/3", "w-1/4", "w-1/5", "w-1/6"];

  $: active = 0;
</script>

<div class="">
    <div id={`snippet-${snippets[active].title}`} class="typo-small"  >
      <pre class="text-xs font-light"><Highlight language={bash} code={snippets[active].code}/></pre>
    </div>
</div>
<div class="flex w-full justify-between border-t border-blue-600 bg-gray-800">
  {#each snippets as snippet, index (snippet.title)}
    <button
      id={`snippet-btn-${snippet.title}`}
      class={columnsClass[snippets.length] +
        " typo-small px-2 py-1 text-center " +
        (index !== active ? "text-gray-200 hover:bg-gray-900 hover:text-gray-100" : "bg-blue-600 text-gray-100")}
      on:click={() => {
        console.log(active)
        active = index;
      }}
    >
      <code class="text-xs">{snippet.title}</code>
    </button>
  {/each}
</div>
