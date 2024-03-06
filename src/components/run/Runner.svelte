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
    if (value) {
      pyodideWorker.postMessage({
        dir: value,
      });
    }
  });

  async function run_multiqc() {
    for (const char of "multiqc .") {
      await new Promise((r) => setTimeout(r, 60));
      terminal_command += char;
    }
    pyodideWorker.postMessage({
      code: `
import multiqc
multiqc.run('/data', no_ansi=True, force=True)
        `,
    });
  }

  async function open_report() {
    pyodideWorker.postMessage({
      report: true,
    });
  }
  function clean_stdout(line: string) {
    line = line.replace(
      /^  \/\/\/ MultiQC 🔍 (.+)/,
      '\n<span class="slashes">///</span> <a href="https://multiqc.info/" target="_blank" >MultiQC</a> 🔍 <span>$1</span>\n'
    );
    line = line.replace(/^(\| +.+ \|)/, "<span>$1</span>");
    return line;
  }

  onMount(async () => {
    browser_supported = window.showDirectoryPicker !== undefined;
    pyodideWorker = new Worker("/run_deps/pyodideWorker.js");
    pyodideWorker.onmessage = (event) => {
      // Handle data coming back from the worker
      const { type, status, report, error, pythonStdout, pythonStderr } = event.data;
      if (error) {
        console.error(error);
      }
      // switch statement to handle different statuses
      switch (status) {
        case "ready":
          pyodide_ready = true;
          break;
        case "mounted":
          pyodideWorker.postMessage({
            code: `
            # coding: utf-8
            import pathlib

            file_icon = '<svg class="inline max-h-5 opacity-60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m4 18H6V4h7v5h5v11Z"/></svg>'
            directory_icon = '<svg class="inline max-h-5 opacity-60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2Z"/></svg>'

            files = []
            for f in pathlib.Path("/data").iterdir():
                icon = file_icon if f.is_file() else directory_icon if f.is_dir() else ''
                files.append(f"{icon} {f.name}")

            print("\\n".join(files))
          `,
          });
          break;
        case "finished":
          let win = window.open("", "");
          win.document.write(report);
          win.document.close();
          break;
      }
      if (pythonStdout) {
        if (terminal_command === "") {
          files += pythonStdout + "\n";
        }
      }
      if (pythonStderr) {
        stdout += clean_stdout(pythonStderr) + "\n";
        if (stdout.includes("No analysis results found")) {
          multiqc_ran = "failed";
        } else if (stdout.includes("MultiQC complete")) {
          multiqc_ran = "successful";
        }
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
          disabled={!$currentDirectory || terminal_command.length > 0 || multiqc_ran.length > 0}
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
      <Button variant="primary" size="sm" on:click={open_report} slot="open_report_btn"
        >Open report</Button
      >
    </Terminal>
  </div>
</div>
