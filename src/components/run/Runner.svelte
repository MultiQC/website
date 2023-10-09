<script lang="ts">
  import Button from "@components/Button.svelte";
  import FileDropZone from "@components/run/FileDropZone.svelte";
  import Terminal from "@components/run/Terminal.svelte";
  import { currentDirectory } from "@components/store";

  import { onMount } from "svelte";

  let pyodideWorker: Worker;
  let browser_supported = false;
  let pyodide_ready = false;
  let files = "";
  let terminal_command = "";
  let multiqc_ran = "";

  $: stdout = "";
  async function select_directory() {
    if (!pyodide_ready) {
      alert("Please wait for Pyodide to initialize before adding files.");
      return;
    } else if ($currentDirectory) {
      alert("Only one directory can be added currently.");
      return;
    } else {
      const dirHandle = await window.showDirectoryPicker();
      currentDirectory.set(dirHandle);
    }
  }
  currentDirectory.subscribe((value) => {
    if (value !== "") {
      list_files(value);
    }
  });

  async function list_files(dir: FileSystemDirectoryHandle) {
    if (dir) {
      // let pyodide = await pyodide_ready_promise;
      // const nativefs = await pyodide.mountNativeFS("/data", dir);
      // pyodide.setStdout({
      //   batched: (str) => {
      //     console.log(str);
      //     files += str + "\n";
      //   },
      // });
      // pyodide.setStderr({
      //   batched: (str) => {
      //     console.log(str);
      //     files += str + "\n";
      //   },
      // });
      // Run Python
      runPythonCode(`
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
  }

  async function run_multiqc_python() {
    console.log(" ----> Running MultiQC <---- ");
    // pyodide.setStdout({
    //   batched: (str) => {
    //     console.log(str);
    //     if (str.trim() != "") {
    //       stdout += clean_stdout(str) + "\n";
    //     }
    //   },
    // });
    // pyodide.setStderr({
    //   batched: (str) => {
    //     console.log(str);
    //     if (str.trim() != "") {
    //       stdout += clean_stdout(str) + "\n";
    //     }
    //   },
    // });
    // Run Python
    runPythonCode(`
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
    run_multiqc_python();
    multiqc_ran = "successful";
    await new Promise((r) => setTimeout(r, 200)); // Wait for stdout in page to update
    if (stdout.includes("No analysis results found")) {
      multiqc_ran = "failed";
    }
  }

  async function open_report() {
    // let pyodide = await pyodide_ready_promise;
    // let report = pyodide.FS.readFile("multiqc_report.html", { encoding: "utf8" });
    var win = window.open("", "");
    win.document.write(report);
    win.document.close();
  }
  function runPythonCode(code) {
    pyodideWorker.postMessage({
      pythonCode: code,
      callbacks: {
        success: (output) => {
          console.log(output);
        },
        error: (error) => {
          console.error(error);
        },
      },
    });
  }

  onMount(async () => {
    browser_supported = window.showDirectoryPicker !== undefined;
    pyodideWorker = new Worker("/run_deps/pyodideWorker.js");
    pyodideWorker.onmessage = (event) => {
      // Handle data coming back from the worker
      const { type, status, result, error, pythonStdout, pythonStderr } = event.data;
      if (error) {
        console.error(error);
      }
      // switch statement to handle different statuses
      switch (status) {
        case "ready":
          pyodide_ready = true;
          break;
        case "success":
          console.log(event.data);
          break;
        case "error":
          console.error(event.data);
          break;
        default:
          console.log(status);
          console.error("Unknown status received from worker.");
      }
    };
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
          disabled={!browser_supported || !pyodide_ready || $currentDirectory}
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
          disabled={!$currentDirectory || multiqc_ran}
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
    <FileDropZone {pyodide_ready} {files} {browser_supported}>
      <slot name="spinner" slot="spinner" />
    </FileDropZone>
  </div>
  <!-- MultiQC "terminal" -->
  <div class="w-full">
    <Terminal {files} {terminal_command} {stdout} {multiqc_ran}>
      <Button variant="primary" size="sm" on:click={run_multiqc} slot="run_multiqc_btn"
        >Run MultiQC</Button
      >
      <Button variant="primary" size="sm" slot="open_report_btn">Open report</Button>
    </Terminal>
  </div>
</div>
