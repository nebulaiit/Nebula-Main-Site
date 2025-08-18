// src/components/MockInterview/QuestionCard.jsx
import React from "react";
import './QuestionCard.css'
import { useSelector } from "react-redux";

export default function QuestionCard({
  currentIndex,
  totalQuestions,
  currentQuestion,
  inputAnswer,
  setInputAnswer,
  handleNext,
}) {

  const darkMode = useSelector((state) => state.darkMode.enabled);

  return (
    <>
      <div className={`question-card ${darkMode ? "dark" : ""}`}>
        <h3>Question {currentIndex + 1} of {totalQuestions}</h3>
        <p className="question-text">{currentQuestion}</p>
        <textarea
          className="answer-area"
          placeholder="Type your answer here..."
          rows={6}
          value={inputAnswer}
          onChange={(e) => setInputAnswer(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div>

    </>
  );
}
