import React from 'react';

const CExamples = () => {
  return (
    <div className="example-container">
      <h1>C Examples</h1>
      <p>Here are some basic C examples:</p>
      <pre>
        <code>
          #include {'<stdio.h>'}{'\n'}
          int main() {'{'}{'\n'}
            printf("Hello, world!\\n");{'\n'}
            return 0;{'\n'}
          {'}'}
        </code>
      </pre>
    </div>
  );
};

export default CExamples;
