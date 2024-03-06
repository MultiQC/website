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

    // Now we want to install multiqc with all other dependencies _except_ kaleido,
    // which is not needed for the browser-based setup, and it doesn't have platform-
    // agnostic wheels. So fetching the dependency list from PyPI:
    const packageName = "multiqc";
    const response = await fetch(`https://pypi.org/pypi/${packageName}/json`);
    const packageData = await response.json();
    let dependencies = packageData.info.requires_dist;
    // Remove any environment markers or version specifiers for simplicity
    dependencies = dependencies.map(dep => dep.split(";")[0].trim().split(" ")[0]);
    // Now, exclude 'kaleido'
    dependencies = dependencies.filter(dep => !dep.includes("kaleido"));
    // And install the remaining dependencies one by one:
    for (const dep of dependencies) {
        await micropip.install(dep);
      console.log(dep + " installed successfully");
    }
    // Finally, install 'multiqc' without automatically pulling its dependencies
    await micropip.install("multiqc", deps=false);
    console.log("multiqc installed successfully");
    postMessage({ type: "status", status: "ready" });

  } catch (error) {
    console.error(error);
    postMessage({ type: "status", status: "error", error: error.message });
  }
  self.pyodide.setStdout({
    batched: (str) => {
      // console.log("stdout", str);
      postMessage({ pythonStdout: str });
    },
  });
  self.pyodide.setStderr({
    batched: (str) => {
      // console.log("stderr", str);
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
