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
  document.getElementById("drop_files_helptext").style.display = "block";
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
          document.getElementById("btn_choose_dir").disabled = true;
          document.getElementById("btn_run_multiQC").disabled = false;
        } else {
          alert("Can only mount directories, not files");
          return false;
        }
      }
    }
    await list_files();
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
const btn_run_multiQC = document.getElementById("btn_run_multiQC");
btn_run_multiQC.addEventListener("click", async () => {
  document.getElementById("multiqc_log_waiting").style.display = "none";
  document.getElementById("multiqc_log_running").style.display = "block";
  await new Promise((r) => setTimeout(r, 20)); // Wait for spinner in page to update
  run_multiqc();
  document.getElementById("multiqc_log_running").style.display = "none";
  document.getElementById("btn_run_multiQC").disabled = true;
  await new Promise((r) => setTimeout(r, 200)); // Wait for stdout in page to update
  if (document.getElementById("stdout").textContent.includes("No analysis results found")) {
    document.getElementById("btn_open_report").disabled = true;
    document.getElementById("btn_open_report_text").innerHTML = "No report generated";
  } else {
    document.getElementById("btn_open_report").disabled = false;
  }
});

async function run_multiqc() {
  console.log(" ----> Running MultiQC <---- ");
  let pyodide = await pyodideReadyPromise;
  const stdout = document.getElementById("stdout");
  pyodide.setStdout({
    batched: (str) => {
      console.log(str);
      stdout.textContent += str + "\n";
    },
  });
  pyodide.setStderr({
    batched: (str) => {
      console.log(str);
      stdout.textContent += str + "\n";
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
const btn_open_report = document.getElementById("btn_open_report");
btn_open_report.addEventListener("click", async () => {
  open_report();
});

async function open_report() {
  let pyodide = await pyodideReadyPromise;
  let report = pyodide.FS.readFile("multiqc_report.html", { encoding: "utf8" });
  var win = window.open("", "");
  win.document.write(report);
  win.document.close();
}
