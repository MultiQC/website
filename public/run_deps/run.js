window.addEventListener('DOMContentLoaded', function() {
  let is_initialized = false;
  let files_selected = false;

  // Initialize Pyodide + install packages
  async function initialize() {
    if (!window.showDirectoryPicker) {
      document.getElementById("unsupported_browser").style.display = "block";
      document.getElementById("loading_spinner").style.display = "none";
      document.getElementById("btn_choose_dir").disabled = true;
      return;
    }
    let pyodide = await loadPyodide();
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    await micropip.install("/run_deps/colormath-3.0.0-py3-none-any.whl");
    await micropip.install("/run_deps/spectra-0.0.11-py3-none-any.whl");
    await micropip.install("multiqc");
    console.log(" ----> Pyodide initialized, packages installed. <---- ");
    document.getElementById("loading_spinner").style.display = "none";
    document.getElementById("drop_files_helptext").style.display = "flex";
    is_initialized = true;
    return pyodide;
  }
  let pyodideReadyPromise = initialize();

  ////////////////////////
  // Add files via button
  ////////////////////////
  document.getElementById("btn_choose_dir").addEventListener("click", async () => {
    if (!is_initialized) {
      alert("Please wait for Pyodide to initialize before adding files.");
      return;
    } else if (files_selected) {
      alert("Only one directory can be added currently.");
      return;
    } else {
      const dirHandle = await window.showDirectoryPicker();
      let pyodide = await pyodideReadyPromise;
      const nativefs = await pyodide.mountNativeFS("/data", dirHandle);
      files_selected = true;
      document.getElementById("btn_choose_dir").disabled = true;
      if (is_initialized) {
        document.getElementById("btn_run_multiQC").disabled = false;
      }
      list_files();
    }
  });

  //////////////////////////////
  // Add files via drag + drop
  //////////////////////////////
  const dropDiv = document.getElementById("drop_files");
  dropDiv.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  dropDiv.addEventListener("dragenter", (e) => {
    e.preventDefault();
    dropDiv.style.opacity = 100;
  });
  dropDiv.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropDiv.style.opacity = 70;
  });

  dropDiv.addEventListener("drop", async (e) => {
    e.preventDefault();
    if (!is_initialized) {
      alert("Please wait for Pyodide to initialize before adding files.");
      return;
    } else if (files_selected) {
      alert("Only one directory can be added currently.");
      return;
    } else {
      let pyodide = await pyodideReadyPromise;
      // Process all of the items.
      for (const item of e.dataTransfer.items) {
        if (item.kind === "file") {
          const entry = await item.getAsFileSystemHandle();
          if (entry.kind === "directory") {
            const nativefs = await pyodide.mountNativeFS("/data", entry);
            files_selected = true;
            await list_files();
            document.getElementById("staged_files_header").style.display = "inline";
            document.getElementById("btn_choose_dir").disabled = true;
            document.getElementById("btn_run_multiQC").disabled = false;
            document.getElementById("terminal_run_multiqc").style.display = "inline-block";
            document.getElementById("blinking_cursor").classList.add("active");
          } else {
            alert("Can only mount directories, not files");
            return false;
          }
        }
      }
    }
  });

  async function list_files() {
    document.getElementById("drop_files_helptext").style.display = "none";
    let pyodide = await pyodideReadyPromise;
    const dropDiv = document.getElementById("drop_files_listfiles");
    dropDiv.style.display = "block";
    pyodide.setStdout({
      batched: (str) => {
        console.log(str);
        dropDiv.textContent += str + "\n";
      },
    });
    pyodide.setStderr({
      batched: (str) => {
        console.log(str);
        dropDiv.textContent += str + "\n";
      },
    });
    // Run Python
    pyodide.runPython(`
import pathlib
files = []
for f in pathlib.Path("/data").iterdir():
    files.append(f.name)
print("\\n".join(files))
`);
  }

  ////////////////////////
  // Run MultiQC
  ////////////////////////
  document.getElementById("btn_run_multiQC").addEventListener("click", async () => {
    run_multiqc();
  });
  document.getElementById("terminal_run_multiqc").addEventListener("click", async (e) => {
    e.preventDefault();
    run_multiqc();
  });

  async function run_multiqc() {
    document.getElementById("btn_run_multiQC").disabled = true;
    document.getElementById("terminal_run_multiqc").style.display = "none";
    for(const char of "multiqc .") {
      await new Promise((r) => setTimeout(r, 60));
      document.getElementById("terminal_command").innerHTML += char;
    }
    await new Promise((r) => setTimeout(r, 20)); // Wait for spinner in page to update
    document.getElementById("stdout").style.display = "block";
    run_multiqc_python();
    await new Promise((r) => setTimeout(r, 200)); // Wait for stdout in page to update
    if (document.getElementById("stdout").textContent.includes("No analysis results found")) {
      document.getElementById("btn_open_report").disabled = true;
      document.getElementById("blinking_cursor").style.display = "none";
      document.getElementById("btn_open_report_text").innerHTML = "No report generated";
    } else {
      document.getElementById("btn_open_report").disabled = false;
      document.getElementById("blinking_cursor").style.display = "none";
      document.getElementById("terminal_open_report").style.display = "block";
    }
  };

  function clean_stdout(line) {
    line = line.replace(/^  \/\/\/ MultiQC 🔍 (.+)/, '\n  <span style="color: #96CBFF">/</span><span style="color: #A8FF61">/</span><span style="color: #FE6B61">/</span> <a href="https://multiqc.info/" target="_blank" style="font-weight: 800; text-decoration:underline; text-decoration-style: dashed;">MultiQC</a> 🔍 <span style="color: #666;">$1</span>\n')
    line = line.replace(/^(\| +.+ \|)/, '<span style="color: #96CBFF;">$1</span>')
    return line;
  }

  async function run_multiqc_python() {
    console.log(" ----> Running MultiQC <---- ");
    let pyodide = await pyodideReadyPromise;
    const stdout = document.getElementById("stdout");
    pyodide.setStdout({
      batched: (str) => {
        console.log(str);
        if(str.trim() != ""){
          stdout.innerHTML += clean_stdout(str) + "\n";
        }
      },
    });
    pyodide.setStderr({
      batched: (str) => {
        console.log(str);
        if(str.trim() != ""){
          stdout.innerHTML += clean_stdout(str) + "\n";
        }
      },
    });
    // Run Python
    pyodide.runPython(`
import multiqc
multiqc.run('/data', no_ansi=True, force=True)
    `);
  }

  ////////////////////////
  // Open report
  ////////////////////////
  document.getElementById("btn_open_report").addEventListener("click", async () => {
    open_report();
  });
  document.getElementById("terminal_open_report").addEventListener("click", async (e) => {
    e.preventDefault();
    open_report();
  });

  async function open_report() {
    let pyodide = await pyodideReadyPromise;
    let report = pyodide.FS.readFile("multiqc_report.html", { encoding: "utf8" });
    var win = window.open("", "");
    win.document.write(report);
    win.document.close();
  }
});
