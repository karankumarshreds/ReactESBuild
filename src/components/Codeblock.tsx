import React, { useState } from 'react';
import { transpile } from 'typescript';

const CodeBlock: React.FC<{ transpile: () => any }> = ({ transpile }) => {
  const [input, setInput] = useState('');
  // code is returned transpiled code from esbuild
  const [code, setCode] = useState('');

  const onClick = () => {
    transpile();
  };

  return (
    <div>
      <textarea onChange={(e) => setInput(e.target.value)} value={input} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre></pre>
    </div>
  );
};

export default CodeBlock;
