import React from 'react';

const CppExamples = () => {
  return (
    <div className="example-container">
      <h1>C++ Examples</h1>
      <p>Here are some basic C++ examples:</p>
      <pre>
        <code>
          #include &lt;iostream&gt;{'\n'}
          using namespace std;{'\n'}
          int main() {'{'}{'\n'}
            cout &lt;&lt; "Hello, world!" &lt;&lt; endl;{'\n'}
            return 0;{'\n'}
          {'}'}
        </code>
      </pre>
    </div>
  );
};

export default CppExamples;
