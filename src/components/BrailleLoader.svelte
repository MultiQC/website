<script>
  import { onMount } from "svelte";

  let dots = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"];
  let currentIndex = 0;

  onMount(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % dots.length;
    }, 100);

    return () => clearInterval(interval); // Cleanup interval on component destroy
  });
</script>

<code>
  {dots[currentIndex]}
</code>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
</style>
