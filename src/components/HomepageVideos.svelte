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
    <div class="overflow-hidden rounded-sm flex inline-flex">
      {#each languages as language}
        <button
          on:click={() => {
            lang = language;
          }}
          class={"block border border-gray-800 bg-gray-700 text-left text-white hover:bg-gray-600 border-r-0 first:ml-0 first:rounded-l-sm last:mr-0 last:rounded-r-sm last:border-r typo-small text-red px-2 py-0.5 text-xs " +
            (lang === language ? " bg-neutral-600" : "")}
        >
          {languageBtnTexts[language]}
        </button>
      {/each}
    </div>
    <div class="mt-3">
      <div class="overflow-hidden rounded-sm flex flex-col">
        {#each filteredVideos as video, idx (idx)}
          <button
            on:click={() => {
              currentIndex = idx;
            }}
            class={"block border border-gray-800 bg-gray-700 text-left text-white hover:bg-gray-600 border-b-0 first:mt-0 first:rounded-t-sm last:mb-0 last:rounded-b-sm last:border-b typo-small px-4 py-2 " +
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
