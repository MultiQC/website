importScripts("https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js");

async function loadAndRunPython() {
  self.pyodide = await loadPyodide();
  await self.pyodide.loadPackage("micropip");
  const micropip = self.pyodide.pyimport("micropip");
  try {
    await micropip.install("/run_deps/colormath-3.0.0-py3-none-any.whl");
    console.log("colormath installed successfully");
    await micropip.install("/run_deps/spectra-0.0.11-py3-none-any.whl");
    console.log("spectra installed successfully");
    await micropip.install("multiqc");
    console.log("multiqc installed successfully");
    postMessage({ type: "status", status: "ready" });
  } catch (error) {
    console.error(error);
    postMessage({ type: "status", status: "error", error: error.message });
  }
  self.pyodide.setStdout({
    batched: (str) => {
      console.log("stdout", str);
      postMessage({ pythonStdout: str });
    },
  });
  self.pyodide.setStderr({
    batched: (str) => {
      console.log("stderr", str);
      postMessage({ pythonStderr: str });
    },
  });
  console.log(" ----> Pyodide initialized, packages installed. <---- ");
}

let pyodide_ready_promise = loadAndRunPython();

self.onmessage = async (event) => {
  await pyodide_ready_promise;
  const { code, dir, report } = event.data;
  if (code) {
    self.pyodide.runPythonAsync(code).then(() => {
      self.postMessage({ type: "status", status: "success" });
    });
  } else if (dir) {
    await self.pyodide.mountNativeFS("/data", dir);
    self.postMessage({ type: "status", status: "mounted" });
  } else if (report) {
    let report = self.pyodide.FS.readFile("multiqc_report.html", { encoding: "utf8" });
    self.postMessage({ status: "finished", type: "report", report: report });
  }
};
