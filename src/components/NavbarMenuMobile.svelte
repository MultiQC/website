<script lang="ts">
  import DarkModeToggle from "@components/DarkModeToggle.svelte";
  import NavbarToc from "@components/NavbarToc.svelte";
  import Icon from "@iconify/svelte";
  import HeroBackgroundSrc from "/images/background.png";
  import LogoCircle from "/logos/multiqc_logo_circle.svg";
  import Logo from "/logos/multiqc_logo_darkbg.svg";

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
</script>

<div class="container-lg flex h-16 w-full flex-wrap items-center justify-between lg:hidden">
  <a href="/" class="block">
    <img src={Logo} class="h-8 lg:h-10" class:hidden={headings.length > 0} alt="MultiQC logo" />
    <img
      src={LogoCircle}
      class="h-8 lg:h-10"
      class:hidden={headings.length == 0}
      alt="MultiQC logo"
    />
  </a>
  <NavbarToc {headings} />
  <button class="text-white" on:click={toggleNavOpened}>
    <Icon icon="mdi:menu" class="h-8 w-8" />
  </button>
</div>

{#if navOpened}
  <div
    class="absolute top-16 left-0 h-[calc(100vh-4rem)] w-full overflow-y-auto pb-6 transition-all"
    class:invisible:opacity-0={!navOpened}
    class:visible:opacity-100={navOpened}
    style="background-image: url({HeroBackgroundSrc})"
  >
    <div class="flex h-full flex-col">
      <div class="flex-1 overflow-y-auto text-center">
        {#each navbarItems as page (page)}
          <a
            href={page.slug}
            class="typo-intro  mt-4 block rounded-sm bg-black bg-opacity-0 py-3 text-gray-100"
            class:bg-opacity-30={(location.pathname.includes(page.slug) && page.slug !== "/") ||
              (page.slug === "/" && location.pathname === "/")}
            class:hover:bg-opacity-50={(!location.pathname.includes(page.slug) &&
              page.slug !== "/") ||
              (page.slug === "/" && location.pathname !== "/")}
          >
            {page.text}</a
          >
        {/each}
        <div class="mt-4">
          <DarkModeToggle><slot /></DarkModeToggle>
        </div>
      </div>
    </div>
  </div>
{/if}
