import ReactDOM from 'react-dom';
import CodeBlock from './components/Codeblock';

// es build config
import * as esbuild from 'esbuild-wasm';
import { useEffect } from 'react';

const App = () => {
  const startService = async () => {
    // initialize esbuild in browser
    // returns objects of funtions used to transpile code and bundle the code
    const service = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm', // getting from public dir
    });
    console.log(service);
  };

  useEffect(() => {
    startService();
  }, []);
  return <CodeBlock />;
};

ReactDOM.render(<App />, document.querySelector('#root'));

/**
 * @wasm
 * WASM means WebAssembly which provides code formats
 * to run languages like C/C++ C#, Go, Rust etc to be
 * run on the web browser
 *
 * @esbuild
 * We are using ESBUILD-WASM module which is a JS
 * wrapper that wraps code written in Golang which
 * inturn will transpile and bundles code for us
 */
