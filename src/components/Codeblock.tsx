import React, { useState } from 'react';

const CodeBlock: React.FC = () => {
  const [input, setInput] = useState('');
  // code is returned transpiled code from esbuild
  const [code, setCode] = useState('');

  const onClick = () => {
    console.log(input);
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
