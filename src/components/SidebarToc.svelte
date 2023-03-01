<script lang="ts">
    import { currentHeading } from '@components/store.js';
    import Icon from '@iconify/svelte';

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
        headingMargin[i] = 'pl-' + (i - min_heading_depth) * 2;
    }
</script>

<div class="">
    <div class="">
        <strong class="">On this page</strong>
        <nav class="">
            <ul class="">
                {#each headings as heading (heading)}
                    <li
                        class={' ' + headingMargin[heading.depth]}
                        class:active={heading.slug === $currentHeading}
                    >
                        <a class="" href={'#' + heading.slug}>
                            {@html heading.text}
                        </a>
                    </li>
                {/each}
            </ul>
            <div class="">
                <a
                    href="#/"
                    class=""
                    on:click={() => window.scrollTo(0, 0)}
                >
                    <Icon icon="mdi:arrow-collapse-up" /> Back to top
                </a>

                <slot />
            </div>
        </nav>
    </div>
</div>

<style lang="scss">
</style>
