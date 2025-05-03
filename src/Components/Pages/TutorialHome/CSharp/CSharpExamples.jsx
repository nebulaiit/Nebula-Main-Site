import React from 'react';

const CSharpExamples = () => {
  return (
    <div className="example-container">
      <h1>C# Examples</h1>
      <p>Here are some basic C# examples:</p>
      <pre>
        <code>
          using System;{'\n'}
          class Program {'{'}{'\n'}
            static void Main() {'{'}{'\n'}
              Console.WriteLine("Hello, world!");{'\n'}
            {'}'}{'\n'}
          {'}'}
        </code>
      </pre>
    </div>
  );
};

export default CSharpExamples;
