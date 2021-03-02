import ReactDOM from 'react-dom';
import CodeBlock from './components/Codeblock';

// es build config
import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef } from 'react';

const App = () => {
  const ref = useRef<any>();
  const startService = async () => {
    // initialize esbuild in browser
    // returns objects of funtions used to transpile code and bundle the code
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm', // getting from public dir
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const transpile = () => {
    if (!ref.current) {
      return;
    } else {
      console.log(ref.current);
    }
  };

  return <CodeBlock transpile={transpile} />;
};

ReactDOM.render(<App />, document.querySelector('#root'));

/**
 * @wasm
 * WASM means WebAssembly which provides code formats
 * to run languages like C/C++ C#, Go, Rust etc to be
 * run on the web browser
 *
 * @esbuildimort
 * We are using ESBUILD-WASM module which is a JS
 * wrapper that wraps code written in Golang which
 * inturn will transpile and bundles code for us
 */
