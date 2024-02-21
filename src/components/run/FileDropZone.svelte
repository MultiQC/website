<script>
  import { currentDirectory } from "@components/store";

  export let files = "";
  export let pyodide_ready = false;
  export let browser_supported = false;

  let drag_hover = false;
  let drag_counter = 0;

  async function handleDragDrop(e) {
    e.preventDefault();
    if (!pyodide_ready) {
      alert("Please wait for Pyodide to initialize before adding files.");
      return;
    } else if (files.length > 0) {
      alert("Only one directory can be added currently.");
      return;
    } else {
      // Process all of the items.
      for (const item of e.dataTransfer.items) {
        if (item.kind === "file") {
          const entry = await item.getAsFileSystemHandle();
          if (entry.kind === "directory") {
            currentDirectory.set(entry);
          }
        }
      }
    }
  }
</script>

<div
  id="drop_files"
  class="mr-1 flex h-full flex-col rounded-sm border border-dashed border-gray-600 px-4 py-6 text-gray-800 transition-opacity dark:border-gray-400 dark:text-gray-200"
  class:opacity-100={drag_hover || files}
  class:opacity-60={!drag_hover && !files}
  on:dragenter={(e) => {
    drag_counter++;
    drag_hover = pyodide_ready; // Only show hover effect if Pyodide is ready
  }}
  on:dragleave={(e) => {
    drag_counter--;
    if (drag_counter === 0) {
      drag_hover = false;
    }
  }}
  on:drop={handleDragDrop}
  on:dragover={(e) => e.preventDefault()}
>
  <div
    class="flex hidden h-full w-full items-center text-center text-red-400"
    class:hidden={browser_supported}
  >
    <div>
      Sorry, your browser doesn't support the <code>showDirectoryPicker</code> method. Please try a
      different browser <br />(currently Chrome, Edge or Opera -
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker#browser_compatibility"
        target="_blank"
        class="typo-link">see supported browsers</a
      >).
    </div>
  </div>
  <div
    id="staged_files_header"
    class="-mx-4 -mt-6 mb-3 rounded-t-sm bg-gray-200 px-2 py-1 font-mono text-xs dark:bg-gray-700"
    class:hidden={!$currentDirectory}
  >
    Staged files
  </div>
  <div
    id="loading_spinner"
    class="flex h-full w-full items-center text-center"
    class:hidden={!browser_supported || pyodide_ready}
  >
    <div class="w-full">
      <slot name="spinner" />
    </div>
  </div>
  <div
    id="drop_files_helptext"
    class="h-full items-center"
    class:hidden={!pyodide_ready || $currentDirectory || !browser_supported}
    class:flex={pyodide_ready}
  >
    <div class="w-full text-center">
      <p class="mb-2">Drag and drop a directory here, or click "Choose directory".</p>
      <p>
        (<a
          class="typo-link"
          href="/examples/rna-seq/data.zip"
          on:click={() => alert("Unzip the file and drag the directory onto the drop zone!")}
          >Download example data</a
        >)
      </p>
    </div>
  </div>
  <pre
    id="drop_files_listfiles"
    class="h-full max-h-52 w-full overflow-y-auto"
    class:hidden={files.length === 0}>{@html files}</pre>
</div>
