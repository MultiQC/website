importScripts('https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js');

async function runPython(code, callbacks = {}) {
  try {
    const output = await pyodide_ready_promise.runPythonAsync(code);
    console.log("output",output)
    callbacks.success && callbacks.success(output);
  } catch (error) {
    callbacks.error && callbacks.error(error.message);
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

async function loadAndRunPython() {
  self.pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' });
  
  await pyodide_ready_promise.loadPackage("micropip");
    const micropip = pyodide_ready_promise.pyimport("micropip");
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
      postMessage({ type: "status", status:"error",  error: error.message })
    }
    console.log(" ----> Pyodide initialized, packages installed. <---- ");
  onmessage = (event) => {
    console.log('event',event)
    const { pythonCode, callbacks } = event.data;
    runPython(pythonCode, callbacks);
  };
}

let pyodide_ready_promise = loadAndRunPython();
