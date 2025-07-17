// src/components/MockInterview/InterviewResult.jsx
import React from "react";

export default function InterviewResult({ feedback, modelAnswer }) {
  return (
    <div className="interview-result">
      <h3>🎯 Interview Complete</h3>
      <h4>📌 Feedback</h4>
      <p>{feedback}</p>
      <h4>✅ Model Answers</h4>
      <p>{modelAnswer}</p>
    </div>
  );
}
