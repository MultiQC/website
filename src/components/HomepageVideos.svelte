<script lang="ts">
  export let videos: {
    id: string;
    title: string;
    language: string;
  }[];

  export let small = false;
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

<div class="row mt-8">
  <div class="wrapper col-full lg:col-6 hidden lg:block">
    <iframe
      id="multiqc-video"
      src={"https://www.youtube.com/embed/" + filteredVideos[currentIndex].id}
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      title="multiqc video"
      class="video"
    />
  </div>
  <div class="col-full lg:col-6">
    <div class="flex inline-flex overflow-hidden rounded-sm">
      {#each languages as language}
        <button
          on:click={() => {
            lang = language;
          }}
          class={"typo-small text-red block border border-r-0 border-gray-800 bg-gray-700 px-2 py-0.5 text-left text-xs text-white first:ml-0 first:rounded-l-sm last:mr-0 last:rounded-r-sm last:border-r hover:bg-gray-600 " +
            (lang === language ? " bg-neutral-600" : "")}
        >
          {languageBtnTexts[language]}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      <div class="flex flex-col overflow-hidden rounded-sm">
        {#each filteredVideos as video, idx (idx)}
          <button
            on:click={() => {
              currentIndex = idx;
            }}
            class={"typo-small block border border-b-0 border-gray-800 bg-gray-700 px-4 py-2 text-left text-white first:mt-0 first:rounded-t-sm last:mb-0 last:rounded-b-sm last:border-b hover:bg-gray-600 " +
              (currentIndex === idx ? " bg-neutral-600" : "")}
          >
            {video.title}
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    position: relative;
    padding-bottom: 25%;
    width: 100%;
  }

  .video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
</style>
