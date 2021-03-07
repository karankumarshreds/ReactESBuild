import React, { useState } from 'react';
import { transpile } from 'typescript';

const CodeBlock: React.FC<{ transpile: (code: string) => void; transpiledCode: string }> = ({
  transpile,
  transpiledCode,
}) => {
  const [input, setInput] = useState('');
  // code is returned transpiled code from esbuild
  const [code, setCode] = useState('');
  const onClick = () => {
    transpile(input);
  };

  return (
    <div>
      <textarea onChange={(e) => setInput(e.target.value)} value={input} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{transpiledCode}</pre>
    </div>
  );
};

export default CodeBlock;
