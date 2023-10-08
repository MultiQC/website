<script>
  import Button from "@components/Button.svelte";
  import { onMount } from "svelte";
  let pyodide_ready_promise;

  let browser_supported = false;
  let pyodide_ready = false;
  let files_selected = false;
  let files = "";
  let terminal_command = "";
  let show_stdout = false;
  let multiqc_ran = "";
  let drag_hover = false;
  let drag_counter = 0;

  $: stdout = "";
  async function select_directory() {
    if (!pyodide_ready) {
      alert("Please wait for Pyodide to initialize before adding files.");
      return;
    } else if (files_selected) {
      alert("Only one directory can be added currently.");
      return;
    } else {
      const dirHandle = await window.showDirectoryPicker();
      console.log("dirHandle", dirHandle);
      let pyodide = await pyodide_ready_promise;
      const nativefs = await pyodide.mountNativeFS("/data", dirHandle);
      files_selected = true;
      await list_files();
    }
  }
  async function list_files() {
    let pyodide = await pyodide_ready_promise;
    pyodide.setStdout({
      batched: (str) => {
        console.log(str);
        files += str + "\n";
      },
    });
    pyodide.setStderr({
      batched: (str) => {
        console.log(str);
        files += str + "\n";
      },
    });
    // Run Python
    pyodide.runPython(`
    # coding: utf-8
    import pathlib

    file_icon = '<svg class="inline max-h-5 opacity-60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m4 18H6V4h7v5h5v11Z"/></svg>'
    directory_icon = '<svg class="inline max-h-5 opacity-60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2Z"/></svg>'

    files = []
    for f in pathlib.Path("/data").iterdir():
        icon = file_icon if f.is_file() else directory_icon if f.is_dir() else ''
        files.append(f"{icon} {f.name}")

    print("\\n".join(files))
    `);
  }

  function clean_stdout(line) {
    line = line.replace(
      /^  \/\/\/ MultiQC 🔍 (.+)/,
      '\n<span style="color: #96CBFF">/</span><span style="color: #A8FF61">/</span><span style="color: #FE6B61">/</span> <a href="https://multiqc.info/" target="_blank" style="font-weight: 800; text-decoration:underline; text-decoration-style: dashed;">MultiQC</a> 🔍 <span style="color: #666;">$1</span>\n'
    );
    line = line.replace(/^(\| +.+ \|)/, '<span style="color: #96CBFF;">$1</span>');
    return line;
  }

  async function run_multiqc_python() {
    console.log(" ----> Running MultiQC <---- ");
    let pyodide = await pyodide_ready_promise;
    pyodide.setStdout({
      batched: (str) => {
        console.log(str);
        if (str.trim() != "") {
          stdout += clean_stdout(str) + "\n";
        }
      },
    });
    pyodide.setStderr({
      batched: (str) => {
        console.log(str);
        if (str.trim() != "") {
          stdout += clean_stdout(str) + "\n";
        }
      },
    });
    // Run Python
    pyodide.runPython(`
import multiqc
multiqc.run('/data', no_ansi=True, force=True)
        `);
  }

  async function run_multiqc() {
    for (const char of "multiqc .") {
      await new Promise((r) => setTimeout(r, 60));
      terminal_command += char;
    }
    await new Promise((r) => setTimeout(r, 20)); // Wait for spinner in page to update
    show_stdout = true;
    run_multiqc_python();
    multiqc_ran = "successful";
    await new Promise((r) => setTimeout(r, 200)); // Wait for stdout in page to update
    if (stdout.includes("No analysis results found")) {
      multiqc_ran = "failed";
    }
  }

  async function open_report() {
    let pyodide = await pyodide_ready_promise;
    let report = pyodide.FS.readFile("multiqc_report.html", { encoding: "utf8" });
    var win = window.open("", "");
    win.document.write(report);
    win.document.close();
  }

  async function handleDragDrop(e) {
    e.preventDefault();
    if (!pyodide_ready) {
      alert("Please wait for Pyodide to initialize before adding files.");
      return;
    } else if (files_selected) {
      alert("Only one directory can be added currently.");
      return;
    } else {
      let pyodide = await pyodide_ready_promise;
      // Process all of the items.
      for (const item of e.dataTransfer.items) {
        if (item.kind === "file") {
          const entry = await item.getAsFileSystemHandle();
          if (entry.kind === "directory") {
            const nativefs = await pyodide.mountNativeFS("/data", entry);
            files_selected = true;
            await list_files();
          } else {
            alert("Can only mount directories, not files");
            return false;
          }
        }
      }
    }
  }
  onMount(async () => {
    browser_supported = window.showDirectoryPicker !== undefined;

    pyodide_ready_promise = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
    });
    await pyodide_ready_promise.loadPackage("micropip");
    const micropip = pyodide_ready_promise.pyimport("micropip");
    try {
      await micropip.install("/run_deps/colormath-3.0.0-py3-none-any.whl");
      console.log("colormath installed successfully");
      await micropip.install("/run_deps/spectra-0.0.11-py3-none-any.whl");
      console.log("spectra installed successfully");
      await micropip.install("multiqc");
      console.log("multiqc installed successfully");
    } catch (error) {
      console.error(error);
    }
    console.log(" ----> Pyodide initialized, packages installed. <---- ");
    pyodide_ready = true;
  });
</script>

<div>
  <div class="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div>
      <p>
        <Button
          btnId="btn_choose_dir"
          variant="primary"
          size="md"
          classes="mb-4 mr-2"
          disabled={!browser_supported || !pyodide_ready || files_selected}
          on:click={select_directory}
        >
          <slot name="btn_choose_dir" />Step 1 - Choose Directory
        </Button>
      </p>
      <p>
        <Button
          btnId="btn_run_multiQC"
          variant="primary"
          size="md"
          classes="mb-4 mr-2"
          disabled={!files_selected || multiqc_ran}
          on:click={run_multiqc}
        >
          <slot name="btn_run_multiQC" />Step 2 - Run MultiQC
        </Button>
      </p>
      <p>
        <Button
          btnId="btn_open_report"
          variant="primary"
          size="md"
          classes="mr-2"
          disabled={multiqc_ran !== "successful"}
          on:click={open_report}
        >
          <slot name="btn_open_report" />{multiqc_ran === "failed"
            ? "No report generated"
            : "Step 3 - Open Report"}
        </Button>
      </p>
    </div>
    <div>
      <div
        id="drop_files"
        class="mr-1 flex h-full flex-col rounded-sm border border-dashed border-gray-400 px-4 py-6 text-gray-200 transition-opacity"
        class:opacity-100={drag_hover || files_selected}
        class:opacity-60={!drag_hover && !files_selected}
        on:dragenter={(e) => {
          drag_counter++;
          drag_hover = true;
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
        <div class="text-red-400" class:hidden={browser_supported}>
          Sorry, your browser doesn't support the <code>showDirectoryPicker</code> method. Please
          try a different browser (<a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker#browser_compatibility"
            target="_blank"
            class="typo-link">see supported browsers</a
          >).
        </div>
        <div
          id="staged_files_header"
          class="-mx-4 -mt-6 mb-3 bg-gray-700 px-2 py-1 font-mono text-xs"
          class:hidden={!files_selected}
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
          class:hidden={!pyodide_ready || files_selected || !browser_supported}
          class:flex={pyodide_ready}
        >
          <div class="w-full text-center">
            Drag and drop a directory here, or click "Choose directory".
          </div>
        </div>
        <pre
          id="drop_files_listfiles"
          class=" h-full w-full"
          class:hidden={files.length === 0}>{@html files}</pre>
      </div>
    </div>
  </div>
  <!-- MultiQC "terminal" -->
  <div class="w-full">
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
          class:hidden={!files_selected || (files_selected && terminal_command.length > 0)}
        >
          <Button variant="primary" size="sm" on:click={run_multiqc}>Run MultiQC</Button>
        </div>
        <span id="terminal_command">{terminal_command}</span>
        <pre id="stdout" class:hidden={!show_stdout}>{@html stdout}</pre>
        <span
          id="blinking_cursor"
          class:hidden={multiqc_ran.length > 0}
          class:active={files_selected}>&nbsp;</span
        >
        <div
          id="terminal_open_report"
          class="mt-6"
          class:hidden={multiqc_ran !== "successful"}
          on:click={open_report}
          on:keydown={open_report}
        >
          <Button variant="primary" size="sm">Open report</Button>
        </div>
      </div>
    </div>
  </div>
</div>
