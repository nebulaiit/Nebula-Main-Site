import React, { useState } from "react";
import "./MockInterview.css";
import { useSelector } from "react-redux";
import QuestionCard from "./QuestionCard";
import InterviewResult from "./InterviewResult";
import { getMockInterview } from "../../../APIService/apiservice";

export default function MockInterview() {
  const darkMode = useSelector((state) => state.darkMode.enabled);

  const [jobTitle, setJobTitle] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState("medium");
  const [includeCoding, setIncludeCoding] = useState(true);
  const [loading, setLoading] = useState(false);

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ ,setAnswers] = useState([]);
  const [inputAnswer, setInputAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [modelAnswer, setModelAnswer] = useState("");

  // Dummy fallback if backend is not ready
  const dummyQuestions = [
    "What is the difference between an interface and an abstract class in Java?",
    "Explain the concept of garbage collection in Java and how it works.",
    "How would you design a scalable RESTful API?",
    "Write a function in Java to reverse a linked list.",
    "How do you ensure thread safety in a multi-threaded Java application?"
  ];

  const dummyFeedback = `- Strong in theoretical knowledge\n- Add more real-world examples in design questions\n- Review concurrent programming concepts`;
  const dummyModelAnswer = `Available on request in detailed feedback report.`;

  const handleStart = async () => {
    if (!jobTitle) return alert("Please enter a job title.");
    setLoading(true);
    setStarted(true);
    setCurrentIndex(0);
    setAnswers([]);
    setInputAnswer("");

    try {
      const params = { jobTitle, questionCount, difficulty, includeCoding };
      const response = await getMockInterview(params);
      // If backend gives questions separately
      setQuestions(response.questions);
      setFeedback(response.feedback);
      setModelAnswer(response.modelAnswers);

      // For now use dummy:
      setQuestions(dummyQuestions.slice(0, questionCount));
      setFeedback(dummyFeedback);
      setModelAnswer(dummyModelAnswer);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("⚠️ Using fallback dummy questions.");
      setQuestions(dummyQuestions.slice(0, questionCount));
      setFeedback(dummyFeedback);
      setModelAnswer(dummyModelAnswer);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!inputAnswer.trim()) return;
    setAnswers((prev) => [...prev, inputAnswer.trim()]);
    setInputAnswer("");
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className={`mock-interview-container ${darkMode ? "dark" : ""}`}>
      {!started ? (
        <>
          <h2>🧠 Mock Interview Generator</h2>
          <div className="form-section">
            <input
              type="text"
              placeholder="Job Title (e.g. Backend Developer)"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Number of Questions"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
            />
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <label>
              <input
                type="checkbox"
                checked={includeCoding}
                onChange={(e) => setIncludeCoding(e.target.checked)}
              />
              Include Coding Questions
            </label>
            <button onClick={handleStart} disabled={loading}>
              {loading ? "Generating..." : "🚀 Start Interview"}
            </button>
          </div>
        </>
      ) : currentIndex < questions.length ? (
        <QuestionCard
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          currentQuestion={questions[currentIndex]}
          inputAnswer={inputAnswer}
          setInputAnswer={setInputAnswer}
          handleNext={handleNext}
        />
      ) : (
        <InterviewResult feedback={feedback} modelAnswer={modelAnswer} />
      )}
    </div>
  );
}
