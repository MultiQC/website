<script lang="ts">
  import Button from "@components/Button.svelte";

  const iconCookie = `<svg class="h-8 w-8 fill-gray-800 dark:fill-gray-300" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M29.7833 12.5C29.3333 11.6667 28.3333 11.6667 28.3333 11.6667H25V10C25 8.33333 23.3333 8.33333 23.3333 8.33333H20V6.66667C20 5 18.3333 5 18.3333 5H16.6667V1.66667C16.6667 0 15 0 15 0C6.71667 0 0 6.71667 0 15C0 23.2833 6.71667 30 15 30C23.2833 30 30 23.2833 30 15C30 14.1667 29.9333 13.3333 29.7833 12.5ZM13.8667 26.6C15 26.3667 15.8333 25.3667 15.8333 24.1667C15.8333 22.7833 14.7167 21.6667 13.3333 21.6667C11.95 21.6667 10.8333 22.7833 10.8333 24.1667C10.8333 25 11.2667 25.7833 11.9333 26.2333C7.56667 25.0667 4.16667 21.35 3.48333 16.8667C3.33333 16.0167 3.33333 15.1833 3.33333 14.3667C3.45 15.65 4.51667 16.6667 5.83333 16.6667C7.21667 16.6667 8.33333 15.55 8.33333 14.1667C8.33333 12.7833 7.21667 11.6667 5.83333 11.6667C4.7 11.6667 3.75 12.4333 3.45 13.4667C4.11667 8.33333 8.18333 4.16667 13.3333 3.45V5.83333C13.3333 7.21667 14.45 8.33333 15.8333 8.33333H16.6667V9.16667C16.6667 10.55 17.7833 11.6667 19.1667 11.6667H21.6667V12.5C21.6667 13.8833 22.7833 15 24.1667 15H26.6667C26.6667 21.8 20.8333 27.2667 13.8667 26.6ZM10.8333 10C9.45 10 8.33333 8.88333 8.33333 7.5C8.33333 6.11667 9.45 5 10.8333 5C12.2167 5 13.3333 6.11667 13.3333 7.5C13.3333 8.88333 12.2167 10 10.8333 10ZM16.6667 15.8333C16.6667 17.2167 15.55 18.3333 14.1667 18.3333C12.7833 18.3333 11.6667 17.2167 11.6667 15.8333C11.6667 14.45 12.7833 13.3333 14.1667 13.3333C15.55 13.3333 16.6667 14.45 16.6667 15.8333ZM25 19.1667C25 20.55 23.8833 21.6667 22.5 21.6667C21.1167 21.6667 20 20.55 20 19.1667C20 17.7833 21.1167 16.6667 22.5 16.6667C23.8833 16.6667 25 17.7833 25 19.1667Z" /></svg>`;

  let isAccepted = localStorage.userAcceptedCookies === "accepted";
</script>

<div
  class="fixed bottom-0 z-10 w-full border-t bg-gray-50 py-2 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 md:py-3"
  class:hidden={isAccepted}
>
  <div class="container-lg hidden sm:block">
    <div class="flex items-center justify-between">
      <div class="mr-4 hidden md:block">
        {@html iconCookie}
      </div>
      <div class="justify-self-start">
        <p class="typo-small mb-2 text-xs sm:text-sm">
          This website uses cookies to offer you a better browsing experience. Find out more on
          <a
            href="https://seqera.io/privacy-policy/"
            class="typo-link"
            title="Seqera Labs Privacy Policy">how we use cookies</a
          >.
        </p>
      </div>
      <div class="sm:whitespace-nowrap">
        <Button
          variant="secondary"
          size="sm"
          classes="mr-2 mb-2 text-xs sm:text-sm"
          noShadow
          on:click={() => {
            localStorage.userAcceptedCookies = "accepted";
            isAccepted = true;
          }}
        >
          Keep only essential cookies
        </Button>

        <Button
          variant="primary"
          size="sm"
          classes="mb-2 text-xs sm:text-sm"
          noShadow
          on:click={() => {
            localStorage.userAcceptedCookies = "accepted";
            isAccepted = true;
          }}
        >
          Accept all cookies
        </Button>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-between px-3 sm:hidden">
    <div class="justify-self-start">
      <p class="typo-small text-xs">
        <a
          href="https://seqera.io/privacy-policy/"
          class="typo-link"
          title="Seqera Labs Privacy Policy">We use cookies</a
        >.
      </p>
    </div>
    <div>
      <Button
        variant="secondary"
        size="xs"
        noShadow
        on:click={() => {
          localStorage.userAcceptedCookies = "accepted";
          isAccepted = true;
        }}
      >
        Accept essential
      </Button>

      <Button
        variant="primary"
        size="xs"
        noShadow
        on:click={() => {
          localStorage.userAcceptedCookies = "accepted";
          isAccepted = true;
        }}
      >
        Accept all
      </Button>
    </div>
  </div>
</div>
