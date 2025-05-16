import React from 'react';

const CSSExamples = () => {
  return (
    <div className="example-container">
      <h1>CSS Examples</h1>
      <p>Here are some basic CSS examples:</p>
      <pre>
        <code>
          body {'{'}{'\n'}
            background-color: #f0f0f0;{'\n'}
            font-family: Arial, sans-serif;{'\n'}
          {'}'}{'\n'}
          h1 {'{'}{'\n'}
            color: blue;{'\n'}
          {'}'}
        </code>
      </pre>
    </div>
  );
};

export default CSSExamples;
