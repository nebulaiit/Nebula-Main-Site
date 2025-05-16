import React from 'react';

const JavaScriptExamples = () => {
  return (
    <div className="example-container">
      <h1>JavaScript Examples</h1>
      <p>Here are some basic JavaScript examples:</p>
      <pre>
        <code>
          console.log("Hello, world!");{'\n'}
          function add(a, b) {'{'} return a + b; {'}'}{'\n'}
          console.log(add(5, 3));
        </code>
      </pre>
    </div>
  );
};

export default JavaScriptExamples;
