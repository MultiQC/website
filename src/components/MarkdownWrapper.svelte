<script lang="ts">
  import { currentHeading } from "@components/store.js";
  import { onMount } from "svelte";

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
