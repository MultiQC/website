<script lang="ts">
  import { currentHeading } from "@components/store";

  export let headings: {
    text: string;
    slug: string;
    depth: number;
  }[];

  const min_heading_depth = Math.min(...headings.map((h) => h.depth));

  function setCurrentHeading(heading: string) {
    currentHeading.set(heading);
    return null;
  }
</script>

<ul class="toc">
  {#each headings as heading (heading)}
    <li class:active={heading.slug === $currentHeading}>
      <a
        class={"heading-level-" +
          heading.depth +
          " block border-l-2 border-transparent py-1 px-2 text-xs " +
          " hover:bg-blue-100 hover:text-gray-900" +
          " dark:hover:bg-blue-600/[0.2] dark:hover:text-gray-300"}
        href={"#" + heading.slug}
        style="margin-left: {(heading.depth - min_heading_depth) * 0.5}rem; font-size: {90 -
          (heading.depth - min_heading_depth) * 10}%;"
        on:click={setCurrentHeading(heading.slug)}
      >
        {@html heading.text}
      </a>
    </li>
  {/each}
</ul>
