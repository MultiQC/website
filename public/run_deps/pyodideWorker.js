importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js");

async function loadAndRunPython() {
  self.pyodide = await loadPyodide();
  await self.pyodide.loadPackage("micropip");
  // pydantic and pydantic_core are not pure Python, and need to be installed from 
  // the Pyodide package manager (https://github.com/pyodide/pyodide/blob/main/packages/pydantic/meta.yaml)
  // We want to do it early to make sure the pinned version is loaded.
  // await self.pyodide.loadPackage("pydantic");  
  const micropip = self.pyodide.pyimport("micropip");
  try {
    await micropip.install("pydantic==2.7.*");  // pyodide only has 2.7.0, not 2.7.1
    await micropip.install("pygments");  // for some reason it needs to be installed separately
    console.log("pydantic installed successfully");
    await micropip.install("/run_deps/colormath-3.0.0-py3-none-any.whl");
    console.log("colormath installed successfully");
    await micropip.install("/run_deps/spectra-0.0.11-py3-none-any.whl");
    console.log("spectra installed successfully");

    // Now we want to install multiqc with all other dependencies _except_ kaleido,
    // which is not needed for the browser-based setup, and it doesn't have 
    // platform-agnostic wheels. 
    // As a workaround, manually fetching the dependency list from PyPI:
    const response = await fetch(`https://pypi.org/pypi/multiqc/json`);
    const packageData = await response.json();
    let dependencies = packageData.info["requires_dist"];
    // And excluding 'kaleido' (and 'Pillow', also needed only for flat plot export)
    dependencies = dependencies.filter(dep => !dep.includes("kaleido") && !dep.includes("Pillow"));
    // Removing all "extras" dependencies:
    dependencies = dependencies.filter(dep => !dep.includes("; extra =="));
    // Removing any other possible environment markers:
    dependencies = dependencies.map(dep => dep.split(";")[0].trim());
    // And installing the remaining dependencies one by one:
    for (const dep of dependencies) {
      if (!dep.includes("pydantic")) {  // pydantic is already installed above
        console.log("Installing " + dep);
        await micropip.install(dep);
      }
    }
    // Finally, installing 'multiqc' without dependencies
    await self.pyodide.runPythonAsync(`
import asyncio
import micropip
await micropip.install('multiqc', deps=False)
print('multiqc installed successfully')
    `)
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
