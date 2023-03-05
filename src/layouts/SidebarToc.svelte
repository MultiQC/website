<script lang="ts">
  import { currentHeading } from "@components/store";

  export let headings: {
    text: string;
    slug: string;
    depth: number;
  }[];

  const min_heading_depth = Math.min(...headings.map((h) => h.depth));
  // make margin classes from min to max heading depth
  // TODO: rewrite for tailwind
  let headingPadding = {};
  for (let i = min_heading_depth; i <= 4; i++) {
    headingPadding[i] = "pl-" + (i - min_heading_depth) * 2;
  }
</script>

<ul class="toc">
  {#each headings as heading (heading)}
    <li class:active={heading.slug === $currentHeading}>
      <a
        class={headingPadding[heading.depth] +
          " block border-l-2 border-gray-200 py-1 px-2 text-xs hover:!border-blue-600 hover:bg-blue-100 hover:text-gray-900 dark:border-gray-700 dark:hover:!border-blue-600 dark:hover:bg-blue-600/[0.2] dark:hover:text-gray-300"}
        href={"#" + heading.slug}
      >
        {@html heading.text}
      </a>
    </li>
  {/each}
</ul>
