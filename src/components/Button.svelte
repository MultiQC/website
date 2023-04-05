<script lang="ts">
  import Icon from "@iconify/svelte";

  export let classes: string = "";
  export let theme: string = "default";
  export let forceLight: boolean = false;
  export let variant: string = "reset";
  export let size: string = "reset";
  export let noShadow: boolean = false;
  export let submit: boolean = false;
  export let to: string = "";
  export let arrow: boolean = false;
  export let newTab: boolean = false;

  const buttonClassName =
    classes +
    " group font-body font-medium leading-none inline-flex items-center justify-center select-none transition-all duration-200" +
    [
      variant === "reset" ? "bg-transparent" : "",
      theme === "default" && variant === "primary" ? "btn-primary" : "",
      theme === "default" && variant === "secondary" ? "btn-secondary" : "",
      theme === "default" && variant === "accent" ? "btn-accent" : "",
      theme === "alternative" && variant === "primary" ? "btn-primary-alt" : "",
      theme === "alternative" && variant === "secondary" ? "btn-secondary-alt" : "",
      theme === "alternative" && variant === "accent" ? "btn-accent-alt" : "",
      forceLight ? "btn-force-light" : "",
      size === "reset" ? "px-0 py-0" : "",
      size === "xs" ? "px-4 py-2 rounded-full text-xs font-normal" : "",
      size === "sm" ? "px-4 py-2 rounded-full text-sm font-normal" : "",
      size === "md" ? "px-8 py-4 rounded-full text-base" : "",
      size === "lg" ? "px-8 py-6 rounded-full text-lg" : "",
      arrow && size === "sm" ? "hover:pr-10" : "",
      arrow && size === "md" ? "hover:pr-14" : "",
      !noShadow ? "shadow" : "",
      arrow ? "relative" : "",
    ].join(" ");

  const iconClassNames =
    "absolute opacity-0 group-hover:opacity-100 block top-1/2 right-4 transition-opacity duration-100" +
    [size === "sm" ? "h-4 w-4 -mt-2" : "", size === "md" ? "h-6 w-6 -mt-3" : ""].join(" ");
</script>

{#if submit}
  <button type="submit" class={buttonClassName}>
    <slot />
    {#if arrow}
      <Icon icon="mdi:arrow-right" class={iconClassNames} />
    {/if}
  </button>
{:else if to}
  <a href={to} class={buttonClassName} target={newTab ? "_blank" : null}>
    <slot />
    {#if arrow}
      <Icon icon="mdi:arrow-right" class={iconClassNames} />
    {/if}
  </a>
{:else}
  <button type="button" class={buttonClassName}>
    <slot />
    {#if arrow}
      <Icon icon="mdi:arrow-right" class={iconClassNames} />
    {/if}
  </button>
{/if}
