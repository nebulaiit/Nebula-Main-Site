import React, { useState } from "react";
import "./InteractiveLearningSection.css";
import { useSelector } from 'react-redux';




const hierarchyData = {
  'Hands-On Learning': [
    'Interactive Labs',
    'Real-time Simulations',
    'Guided Tutorials',
    'Hardware Integration',
    'Live Debugging',
  ],
  'Practice Project': [
    'Beginner Projects',
    'Intermediate Projects',
    'Capstone Project',
    'Team Collaboration',
    'GitHub Integration',
  ],
  'Coding Challenge': [
    'Daily Challenge',
    'Weekly Hackathon',
    'Timed Quizzes',
    'Problem Sets by Level',
    'Peer Ranking',
  ],
  'Professional Certificate': [
    'Completion Criteria',
    'Industry Recognition',
    'Shareable Certificate',
    'LinkedIn Integration',
    'Mock Interviews',
  ],
};


export default function InteractiveLearningSection() {

  const [activeTopic, setActiveTopic] = useState('Hands-On Learning');

  const darkMode = useSelector((state) => state.darkMode.enabled);

  return (
    <section className={`interactive-learning-section ${darkMode ? 'dark' : ''}`}>
      <p className="subtitle">INTERACTIVE LEARNING</p>
      <h2 className="title">Overcome your fear of coding with Nebula PRO</h2>
      <br></br>
      <div className="interactive-container">
        <div className="left">
          {Object.keys(hierarchyData).map((topic) => (
            <div
              key={topic}
              onClick={() => setActiveTopic(topic)}
              className={`menu-item ${activeTopic === topic ? 'active' : ''}`}
            >
              {topic}
            </div>
          ))}
        </div>
        <div className="menu-content glassmorphism">
          {activeTopic && (
            <div>
              <h2 className="menu-title">{activeTopic}</h2>
              <ul className="menu-list">
                {hierarchyData[activeTopic].map((subtopic, index) => (
                  <li key={index}>{subtopic}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
