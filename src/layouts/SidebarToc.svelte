<script lang="ts">
  import { currentHeading } from "@components/store";

  export let headings: {
    text: string;
    slug: string;
    depth: number;
  }[];

  const min_heading_depth = Math.min(...headings.map((h) => h.depth));
</script>

<ul class="toc">
  {#each headings as heading (heading)}
    <li class:active={heading.slug === $currentHeading}>
      <a
        class="block border-l-2 border-gray-200 py-1 pr-2 text-xs hover:!border-blue-600 hover:bg-blue-100 hover:text-gray-900 dark:border-gray-700 dark:hover:!border-blue-600 dark:hover:bg-blue-600/[0.2] dark:hover:text-gray-300"
        href={"#" + heading.slug}
        style="padding-left: {0.5 + (heading.depth - min_heading_depth) * 0.5}rem"
      >
        {@html heading.text}
      </a>
    </li>
  {/each}
</ul>
