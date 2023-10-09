<script>
  import Button from "@components/Button.svelte";
  import FileDropZone from "@components/run/FileDropZone.svelte";
  import Terminal from "@components/run/Terminal.svelte";
  import { currentDirectory } from "@components/store";
  import { onMount } from "svelte";

  let pyodide_ready_promise;

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
      q;
    }
  }
  currentDirectory.subscribe((value) => {
    if (value !== "") {
      list_files(value);
    }
  });

  async function list_files(dir) {
    if (dir) {
      let pyodide = await pyodide_ready_promise;
      const nativefs = await pyodide.mountNativeFS("/data", dir);
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

    file_icon = "📄"
    directory_icon = "📁"

    files = []
    for f in pathlib.Path("/data").iterdir():
        icon = file_icon if f.is_file() else directory_icon if f.is_dir() else ''
        files.append(f"{icon} {f.name}")

    print("\\n".join(files))
    `);
    }
  }
  function clean_stdout(line) {
    line = line.replace(
      /^  \/\/\/ MultiQC 🔍 (.+)/,
      '\n<div class="header"><span>/</span><span>/</span><span>/</span> <a href="https://multiqc.info/" target="_blank" >MultiQC</a> 🔍 <span>$1</span></div>\n'
    );
    line = line.replace(/^(\| +.+ \|)/, "<span>$1</span>");
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
          disabled={!browser_supported || !pyodide_ready}
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
          disabled={!$currentDirectory}
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
