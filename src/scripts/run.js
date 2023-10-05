let is_initialized = false;
let files_selected = false;

// Initialize Pyodide + install packages
async function initialize() {
  let pyodide = await loadPyodide();
  await pyodide.loadPackage("micropip");
  const micropip = pyodide.pyimport("micropip");
  await micropip.install("/run_deps/colormath-3.0.0-py3-none-any.whl");
  await micropip.install("/run_deps/spectra-0.0.11-py3-none-any.whl");
  await micropip.install("multiqc");
  console.log(" ----> Pyodide initialized, packages installed. <---- ");
  is_initialized = true;
  if (files_selected) {
    const runMultiQC = document.getElementById("runMultiQC");
    runMultiQC.disabled = false;
  }
  return pyodide;
}
let pyodideReadyPromise = initialize();

// User adds files
const butDir = document.getElementById("butDirectory");
butDir.addEventListener("click", async () => {
  const dirHandle = await window.showDirectoryPicker();
  let pyodide = await pyodideReadyPromise;
  const nativefs = await pyodide.mountNativeFS("/data", dirHandle);
  files_selected = false;
  if (is_initialized) {
    const runMultiQC = document.getElementById("runMultiQC");
    runMultiQC.disabled = false;
  }
});

// User runs MultiQC
const runMultiQC = document.getElementById("runMultiQC");
runMultiQC.addEventListener("click", async () => {
  run_multiqc();
});

async function run_multiqc() {
  console.log(" ----> Running MultiQC <---- ");
  let pyodide = await pyodideReadyPromise;
  const stdout = document.getElementById("stdout");
  const hideMe = document.getElementById("hideMe");
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
  const openReport = document.getElementById("openReport");
  openReport.disabled = false;
}

// User runs MultiQC
const openReport = document.getElementById("openReport");
openReport.addEventListener("click", async () => {
  open_report();
});

// Show generated report
async function open_report() {
  let pyodide = await pyodideReadyPromise;
  let report = pyodide.FS.readFile("multiqc_report.html", { encoding: "utf8" });
  var win = window.open("", "");
  win.document.write(report);
  win.document.close();
}
