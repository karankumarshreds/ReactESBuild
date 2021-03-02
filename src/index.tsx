import ReactDOM from 'react-dom';
import CodeBlock from './components/Codeblock';

// es build config
import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from 'react';

const App = () => {
  const ref = useRef<any>();
  const [transpiledCode, setTranspiledCode] = useState('');
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

  const transpile = async (code: string) => {
    if (!ref.current) {
      return;
    } else {
      const result = await ref.current.transform(code, {
        loader: 'jsx', // type of code we are providing
        target: 'es2015', //
      });
      setTranspiledCode(result.code);
    }
  };

  return <CodeBlock transpile={transpile} transpiledCode={transpiledCode} />;
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
