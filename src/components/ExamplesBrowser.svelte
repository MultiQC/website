<script lang="ts">
  export let items: {
    data: {
      title: string;
      embed: string;
    };
    slug: string;
  }[];
  export let hasDetails = false;
  let active = 0;
  let setActive = (index: number) => {
    active = index;
  };
  import Button from "@components/Button.svelte";
</script>

<div class="overflow-hidden rounded-md border border-gray-200 text-gray-800 shadow">
  <div class="overflow-hidden rounded-md border border-gray-200 shadow">
    {#if items.length === 1}
      <div class="flex border-b border-gray-200 bg-gray-100">
        <div class="flex px-4 pb-2 pt-4">
          <img src="/logos/multiqc_icon_color.svg" alt="MultiQC Logo" class="my-0 mr-2 h-5 w-5" />
          <span class="typo-small -mt-0.5">
            Example Report: {items[0].data.title}
          </span>
        </div>
      </div>
    {:else}
      <div class="flex border-b border-gray-200 bg-gray-100">
        <div class="flex px-4 pb-2 pt-4 lg:w-[250px]">
          <img src="/logos/multiqc_icon_color.svg" alt="MultiQC Logo" class="mr-2 h-5 w-5" />
          <span class="typo-small -mt-0.5">Example Reports</span>
        </div>
        <div class="flex pt-2">
          {#each items as item, index (index)}
            <div id={`example-report-btn-${item.data.title}`}>
              <button
                class={"typo-small bg-gray-2 h-full rounded-t-sm px-4 " +
                  (index !== active ? "hover:bg-white" : "bg-gray-200 hover:bg-gray-200")}
                on:click={() => {
                  setActive(index);
                }}
              >
                {item.data.title}
              </button>
            </div>
          {/each}
        </div>
        {#if hasDetails}
          <div class="grow px-4 py-2 text-right">
            <Button
              to={"/example-reports/" + items[active].slug}
              variant="secondary"
              size="sm"
              forceLight
            >
              See report details
            </Button>
          </div>
        {/if}
      </div>
    {/if}
    <div>
      <iframe
        loading="lazy"
        src={items[active].data.embed}
        title="Example Report"
        class="h-[600px] w-full"
      />
    </div>
  </div>
</div>
