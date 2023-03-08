<script lang="ts">
  import { onMount } from "svelte";
  import { currentHeading } from "@components/store.js";

  export let headings: { text: string; slug: string; depth: number }[] = [];

  // find current heading in viewport with IntersectionObserver
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentHeading.set(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -92% 0px", // 92% of viewport height to offset navbar
      }
    );
    headings.forEach((heading) => {
      const element = document.querySelector("#" + heading.slug);
      observer.observe(element);
    });
  });
</script>

<div class="markdown-content">
  <slot />
</div>

<style lang="scss">
  .markdown-content {
    :global(.admonition) {
      @apply rounded-sm border p-4;
      :global(p) {
        margin: 0;
      }
    }

    :global(.admonition-info) {
      @apply border-blue-500  bg-blue-400 dark:bg-blue-600;
    }
  }
</style>
