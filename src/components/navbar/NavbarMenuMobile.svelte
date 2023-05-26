<script lang="ts">
  import DarkModeToggle from "@components/DarkModeToggle.svelte";
  import NavbarToc from "@components/navbar/NavbarToc.svelte";
  import HeroBackgroundSrc from "/images/background.png";
  import LogoCircle from "/logos/multiqc_logo_circle.svg";
  import Logo from "/logos/multiqc_logo_darkbg.svg";

  // <Icon icon="mdi:menu" class="h-8 w-8" />
  const icon_mdi_menu = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="h-8 w-8 iconify iconify--mdi" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"></path></svg>`;

  export let headings: {
    text: string;
    slug: string;
    depth: number;
  }[];
  export let navbarItems: {
    text: string;
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
      src={Logo}
      class="h-8 transition-opacity ease-in lg:h-10"
      class:opacity-0={location.pathname === "/" && y <= 85}
      class:opacity-100={location.pathname === "/" && y > 85}
      class:hidden={headings.length > 0}
      alt="MultiQC logo"
    />
    <img
      src={LogoCircle}
      class="h-8 lg:h-10"
      class:hidden={headings.length == 0}
      alt="MultiQC logo"
    />
  </a>
  <NavbarToc {headings} />
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
              class="typo-intro mt-1 block rounded-sm bg-black bg-opacity-0 py-2 text-gray-100"
              class:bg-opacity-30={(location.pathname.includes(page.slug) && page.slug !== "/") ||
                (page.slug === "/" && location.pathname === "/")}
              class:hover:bg-opacity-50={(!location.pathname.includes(page.slug) &&
                page.slug !== "/") ||
                (page.slug === "/" && location.pathname !== "/")}
            >
              {page.text}</a
            >
          {/if}
        {/each}
        <div class="mt-4">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  </div>
{/if}
