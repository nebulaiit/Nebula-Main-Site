import React from 'react';

const HTMLExamples = () => {
  return (
    <div className="example-container">
      <h1>HTML Examples</h1>
      <p>Here are some basic HTML examples:</p>
      <pre>
        <code>
          {'<'}!DOCTYPE html{'>'}{'\n'}
          {'<'}html{`>`}{'\n'}
          {'<'}head{`>`}{'\n'}
            {'<'}title{`>`}Hello HTML{'<'}/title{`>`}{'\n'}
          {'<'} /head{`>`}{'\n'}
          {'<'}body{`>`}{'\n'}
            {'<'}h1{`>`}Hello, world!{'<'}/h1{`>`}{'\n'}
          {'<'} /body{`>`}{'\n'}
          {'<'} /html{`>`}
        </code>
      </pre>
    </div>
  );
};

export default HTMLExamples;
