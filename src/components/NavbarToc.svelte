<script lang="ts">
    import { currentHeading } from '@components/store';
    export let headings: {
        text: string;
        slug: string;
        depth: number;
    }[];
</script>

<div class="">
    <div class="dropdown">
        <button
            class="mx-2 mr-px rounded-sm bg-black bg-opacity-0 py-1 px-4 font-body font-light tracking-wide hover:text-white text-gray-300 border"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <i class="fa-solid fa-list" aria-hidden="true" /> On this page
        </button>
        <ul class="hidden" aria-labelledby="dropdownMenuButton">
            {#each headings as heading (heading)}
                <li class:active={heading.slug === $currentHeading}>
                    <a class="dropdown-item" href={'#' + heading.slug}>
                        {@html heading.text}
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style lang="scss">
</style>
