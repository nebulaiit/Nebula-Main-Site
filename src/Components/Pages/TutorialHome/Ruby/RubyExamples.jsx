import React from 'react';

const RubyExamples = () => {
  return (
    <div className="example-container">
      <h1>Ruby Examples</h1>
      <p>Here are some basic Ruby examples:</p>
      <pre>
        <code>
          puts "Hello, world!"{'\n'}
          def add(a, b){'\n'}
            a + b{'\n'}
          end{'\n'}
          puts add(5, 3)
        </code>
      </pre>
    </div>
  );
};

export default RubyExamples;
