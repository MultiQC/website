<script lang="ts">
  export let videos: {
    id: string;
    title: string;
    language: string;
  }[];

  $: lang = "en";
  $: currentIndex = 0;

  let languages = videos.map((video) => video.language);
  languages = [...new Set(languages)];
  const languageBtnTexts = {
    en: "English 🇬🇧",
    es: "Espanol 🇪🇸",
  };
  $: filteredVideos = videos.filter((video) => {
    return video.language === lang;
  });
</script>

<div class="row mt-8 items-center">
  <div class="wrapper col-full lg:col-6 hidden lg:block">
    <lite-youtube videoid="filteredVideos[currentIndex].id" />
    <iframe
      id="multiqc-video"
      src={"https://www.youtube.com/embed/" + filteredVideos[currentIndex].id}
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      title="multiqc video"
      class="video aspect-video h-full w-full"
    />
  </div>
  <div class="col-full lg:col-6 hidden  !pl-0 lg:block">
    <div class="">
      <div class="flex flex-col overflow-hidden rounded-sm">
        {#each filteredVideos as video, idx (idx)}
          <button
            on:click={() => {
              currentIndex = idx;
            }}
            class={"typo-small block border border-b-0 border-gray-800 bg-gray-700 px-4 py-2 text-left text-gray-100 first:mt-0 first:rounded-t-sm last:mb-0 last:rounded-b-sm last:border-b hover:bg-gray-600 " +
              (currentIndex === idx ? " bg-neutral-600" : "")}
          >
            {video.title}
          </button>
        {/each}
      </div>
    </div>
    <div class="mt-3 flex inline-flex overflow-hidden rounded-sm">
      {#each languages as language}
        <button
          on:click={() => {
            lang = language;
          }}
          class={"typo-small text-red block border border-r-0 border-gray-800 bg-gray-700 px-2 py-0.5 text-left text-xs text-gray-100 first:ml-0 first:rounded-l-sm last:mr-0 last:rounded-r-sm last:border-r hover:bg-gray-600 " +
            (lang === language ? " bg-neutral-600" : "")}
        >
          {languageBtnTexts[language]}
        </button>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
</style>
