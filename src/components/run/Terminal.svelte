<script>
  export let files = "";
  export let terminal_command = "";
  export let stdout = "";
  export let multiqc_ran = "";
</script>

<div
  class="coding inverse-toggle rounded-sm border border-gray-700 border-opacity-50 bg-black bg-opacity-20 px-5 pb-6 pt-4 font-mono text-sm text-gray-100 subpixel-antialiased shadow-lg"
>
  <div class="top mb-2 flex opacity-70">
    <div class="h-3 w-3 rounded-full bg-rose-600" />
    <div class="ml-2 h-3 w-3 rounded-full bg-orange-300" />
    <div class="ml-2 h-3 w-3 rounded-full bg-green-500" />
  </div>
  <div class="mt-4">
    <span class="mr-2 text-green-400">$</span>
    <div
      id="terminal_run_multiqc"
      class="inline-block"
      class:hidden={!files || (files && terminal_command.length > 0)}
    >
      <slot name="run_multiqc_btn" />
    </div>
    <span id="terminal_command">{terminal_command}</span>
    <pre id="stdout" class:hidden={!stdout}>{@html stdout}</pre>
    <span id="blinking_cursor" class:hidden={multiqc_ran.length > 0} class:active={files.length > 0}
      >&nbsp;</span
    >
    <div id="terminal_open_report" class="mt-6" class:hidden={multiqc_ran !== "successful"}>
      <slot name="open_report_btn" />
    </div>
  </div>
</div>

<style lang="scss">
  #stdout {
    :global(span) {
      color: #96cbff;
    }
    :global(.header span:nth-child(2)) {
      color: #a8ff61;
    }
    :global(.header span:nth-child(3)) {
      color: #fe6b61;
    }
  }

  a {
    font-weight: 800;
    text-decoration: underline;
    text-decoration-style: dashed;

    &:hover {
      // Define hover state if needed
    }
  }
</style>
