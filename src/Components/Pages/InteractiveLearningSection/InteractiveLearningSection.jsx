import React, { useState } from "react";
import "./InteractiveLearningSection.css";

import video1 from "../../video/pro-sensai-demo.mp4";
import video2 from "../../video/pro-project-demo.mp4";
import video3 from "../../video/pro-interactive-course-demo.mp4";
import video4 from "../../video/pro-challenges-demo.mp4";
import video5 from "../../video/pro-certificate-demo.mp4";

const features = [
  {
    title: "Hands-on learning",
    description: "Practice what you learn with our interactive courses, practice problems, and quizzes.",
    video: video1,
  },
  {
    title: "Practice projects",
    description: "Build your confidence through guided real-world projects.",
    video: video2,
  },
  {
    title: "Coding challenges",
    description: "Level up your skills with our challenges and compete on our global leaderboard.",
    video: video3,
  },
  {
    title: "AI mentor",
    description: "Get personalized AI help with code explanation, error fixing, and feedback for improvements.",
    video: video4,
  },
  {
    title: "Professional certificates",
    description: "Showcase your expertise and stand out to your potential employers.",
    video: video5,
  },
];

export default function InteractiveLearningSection() {
  const [selectedFeature, setSelectedFeature] = useState(features[0].title);

  const current = features.find((f) => f.title === selectedFeature);

  return (
    <section className="interactive-learning-section">
      <p className="subtitle">INTERACTIVE LEARNING</p>
      <h2 className="title">Overcome your fear of coding with Nebula PRO</h2>
      <br></br>
      <div className="interactive-container">
        <div className="left">
          {features.map((feature, index) => (
            <div key={index} className="feature-block">
              <button
                className={`feature-button-box ${
                  selectedFeature === feature.title ? "active" : ""
                }`}
                onClick={() => setSelectedFeature(feature.title)}
              >
                {feature.title}
              </button>
              {selectedFeature === feature.title && (
                <p className="feature-description">{feature.description}</p>
              )}
            </div>
          ))}
          <button className="try-pro-button">Try Nebula PRO</button>
        </div>

        <div className="right">
          <video
            className="feature-video"
            src={current.video}
            controls
            autoPlay
            muted
            loop
          />
        </div>
      </div>
    </section>
  );
}
