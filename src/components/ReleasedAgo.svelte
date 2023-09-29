<script lang="ts">
  export let released_time: string;

  function millisToText(ms: number) {
    const time = {
      month: Math.floor(ms / 2592000000),
      week: Math.floor(ms / 604800000),
      day: Math.floor(ms / 86400000),
      hour: Math.floor(ms / 3600000) % 24,
      minute: Math.floor(ms / 60000) % 60,
    };
    if (time.month > 0) return `${time.month} month${time.month > 1 ? "s" : ""}`;
    if (time.week > 1) return `${time.week} weeks`;
    if (time.day > 0) return `${time.day} day${time.day > 1 ? "s" : ""}`;
    if (time.hour > 0) return `${time.hour} hour${time.hour > 1 ? "s" : ""}`;
    return `${time.minute} minutes`;
  }

  let tDelta = Date.now() - new Date(released_time).getTime();
</script>

<div class="typo-small mb-6 block text-xs text-gray-300">
  {millisToText(tDelta)} ago
</div>
