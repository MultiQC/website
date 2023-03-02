<script lang="ts">
  import { currentHeading } from "@components/store.js";
  import Icon from "@iconify/svelte";
  import Button from "@components/Button.svelte";

  export let headings: {
    text: string;
    slug: string;
    depth: number;
  }[];

  const min_heading_depth = Math.min(...headings.map((h) => h.depth));
  // make margin classes from min to max heading depth
  // TODO: rewrite for tailwind
  let headingMargin = {};
  for (let i = min_heading_depth; i <= 4; i++) {
    headingMargin[i] = "pl-" + (i - min_heading_depth) * 2;
  }
</script>

<nav class=" text-gray-600 dark:text-gray-500">
  <h5 class="mb-2 font-semibold">On this page</h5>
  <ul>
    {#each headings as heading (heading)}
      <li
        class={"toc " + headingMargin[heading.depth]}
        class:active={heading.slug === $currentHeading}
      >
        <a
          class="block border-l-4 border-gray-200 py-1 px-2 text-xs hover:!border-blue-600 hover:!bg-blue-200 dark:border-gray-700 dark:hover:!border-blue-600 dark:hover:!bg-blue-600/[0.2] dark:hover:text-gray-400"
          href={"#" + heading.slug}
        >
          {@html heading.text}
        </a>
      </li>
    {/each}
  </ul>
  <Button to={"#"} variant="accent" size="xs" classes="my-3">
    <Icon icon="mdi:arrow-collapse-up" class="mr-2 inline-block" /> Back to top
  </Button>
  <slot />
</nav>

<style lang="scss">
</style>
