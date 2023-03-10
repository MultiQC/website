<script lang="ts">
  import { currentHeading } from "@components/store";

  export let headings: {
    text: string;
    slug: string;
    depth: number;
  }[];

  const show_min_heading_depth = 2;
  const show_max_heading_depth = 3;
  const min_heading_depth = Math.min(...headings.map((h) => h.depth)) - show_min_heading_depth + 3;
</script>

<ul class="toc">
  {#each headings as heading (heading)}
    <!--
    {#if heading.depth >= show_min_heading_depth && heading.depth <= show_max_heading_depth}
    -->
    <li class:active={heading.slug === $currentHeading}>
      <a
        class={"heading-level-" +
          heading.depth +
          " block border-l-2 border-transparent py-1 px-3 text-xs " +
          " hover:bg-blue-100 hover:text-gray-900" +
          " dark:hover:bg-blue-600/[0.2] dark:hover:text-gray-300"}
        href={"#" + heading.slug}
        style="margin-left: {(heading.depth - min_heading_depth) * 0.5}rem; font-size: {90 -
          (heading.depth - min_heading_depth) * 10}%;"
        depth={heading.depth}
      >
        {@html heading.text}
      </a>
    </li>
    <!--
    {/if}
    -->
  {/each}
</ul>
