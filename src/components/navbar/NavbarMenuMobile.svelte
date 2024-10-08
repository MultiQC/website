<script lang="ts">
  import DarkModeToggle from "@components/DarkModeToggle.svelte";
  import NavbarToc from "@components/navbar/NavbarToc.svelte";

  import HeroBackgroundSrc from "@assets/images/background.png?url";
  import docsearch from "@docsearch/js";
  import "@docsearch/css";
  import { onMount } from "svelte";

  onMount(() => {
    docsearch({
      container: "#mobileSearch",
      appId: "V0JDBH4NO9",
      apiKey: "7dbf54c298bba90faba20e714a99550a",
      indexName: "multiqc",
    });
  });

  const icon_mdi_menu = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="h-8 w-8 iconify iconify--mdi" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"></path></svg>`;
  const icon_external_link = `<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1 inline-block" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z"/></svg>`;

  export let headings: {
    text: string;
    slug: string;
    depth: number;
  }[];
  export let navbarItems: {
    text: string;
    text_sm?: string;
    slug: string;
  }[];
  export let location: URL;

  let navOpened = false;
  function toggleNavOpened() {
    navOpened = !navOpened;
  }
  let y: number = 0;
</script>

<div class="container-lg flex h-16 w-full flex-wrap items-center justify-between lg:hidden">
  <a href="/" class="block" title="Go to the MultiQC homepage">
    <img
      src="/logos/multiqc_logo_darkbg.svg"
      class="h-8 transition-opacity ease-in lg:h-10"
      class:opacity-0={location.pathname === "/" && y <= 85}
      class:opacity-100={location.pathname === "/" && y > 85}
      class:hidden={headings.length > 0}
      alt="MultiQC logo"
    />
    <img
      src="/logos/multiqc_icon_color.svg"
      class="h-8 lg:h-10"
      class:hidden={headings.length == 0}
      alt="MultiQC logo"
    />
  </a>
  <NavbarToc {headings} />

  <div id="mobileSearch" class="h-8" />
  <button class="text-white" on:click={toggleNavOpened} title="Open navigation">
    {@html icon_mdi_menu}
  </button>
</div>
<svelte:window bind:scrollY={y} />
{#if navOpened}
  <div
    class="absolute left-0 top-16 h-[calc(100vh-4rem)] w-full overflow-y-auto pb-6 transition-all"
    style="background-image: url({HeroBackgroundSrc})"
  >
    <div class="flex h-full flex-col">
      <div class="flex-1 overflow-y-auto text-center">
        {#each navbarItems as page (page)}
          {#if page.items?.length > 0}
            {#each page.items as subpage (subpage)}
              <a
                href={subpage.slug}
                class="typo-intro mt-1 block rounded-sm bg-black bg-opacity-0 py-2 text-gray-100"
                class:bg-opacity-30={(location.pathname.includes(subpage.slug) &&
                  subpage.slug !== "/") ||
                  (subpage.slug === "/" && location.pathname === "/")}
                class:hover:bg-opacity-50={(!location.pathname.includes(subpage.slug) &&
                  subpage.slug !== "/") ||
                  (subpage.slug === "/" && location.pathname !== "/")}
              >
                {subpage.text}</a
              >
            {/each}
          {:else}
            <a
              href={page.slug}
              target={page.slug.startsWith("http") ? "_blank" : "_self"}
              class="typo-intro mt-1 block rounded-sm bg-black bg-opacity-0 py-2 text-gray-100"
              class:bg-opacity-30={(location.pathname.includes(page.slug) && page.slug !== "/") ||
                (page.slug === "/" && location.pathname === "/")}
              class:hover:bg-opacity-50={(!location.pathname.includes(page.slug) &&
                page.slug !== "/") ||
                (page.slug === "/" && location.pathname !== "/")}
            >
              {page.text}
              {@html page.slug.startsWith("http") ? icon_external_link : ""}
            </a>
          {/if}
        {/each}
        <div class="mt-4">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  </div>
{/if}
