import React from 'react';

const SQLExamples = () => {
  return (
    <div className="example-container">
      <h1>SQL Examples</h1>
      <p>Here are some basic SQL examples:</p>
      <pre>
        <code>
          CREATE TABLE users ({'\n'}
            id INT PRIMARY KEY,{'\n'}
            name VARCHAR(100){'\n'}
          );{'\n\n'}
          SELECT * FROM users;
        </code>
      </pre>
    </div>
  );
};

export default SQLExamples;
