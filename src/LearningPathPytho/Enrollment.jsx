import React, { useState } from "react";
import "./Enrollment.css";
import certificateImg from "./images/certificate.png";
import { useNavigate } from "react-router-dom";

const Enrollment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    setEnrolled(true);
    setTimeout(() => {
      setEnrolled(false);
      navigate("/login");
    }, 1000);
  };

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  // const handleMenuClick = () => {
  //   navigate("/progamming");
  // };

  const handleJobNotificationClick = () => {
    navigate("/job-notification");
  };

  const courseTitles = [
    "Learn Python Basics",
    "Practice: Python Basics",
    "Learn Python Intermediate",
    "Practice: Python Intermediate",
    "Build Final Project"
  ];

  const projects = [
    {
      title: "Rock, Paper & Scissors",
      img: "https://cdn-icons-png.flaticon.com/512/184/184250.png"
    },
    {
      title: "Tic Tac Toe",
      img: "https://cdn-icons-png.flaticon.com/512/342/342362.png"
    },
    {
      title: "QR Code Generator",
      img: "https://cdn-icons-png.flaticon.com/512/6081/6081304.png"
    }
  ];

  return (
    <div className="enrollment-page">
      {/* === Sticky Right Sidebar === */}
      <aside className="sticky-enroll">
        <div className="course-right">
          <button onClick={handleEnrollClick} className="enroll-btn" aria-label="Enroll Button">
            Enroll to Get Started
          </button>

          {enrolled && <p style={{ color: "#28a745", fontWeight: "bold" }}>✅ Enrollment Started!</p>}

          <div className="course-benefits">
            <p>✅ Learn Python step-by-step from start to finish.</p>
            <p>✅ Solve 100+ practice problems in real-time.</p>
            <p>✅ Get certified and prepare for your first Python interview.</p>
          </div>
          <p className="salary">💰 Average Salary (IN): ₹5,80,000</p>
          <p>📦 Prerequisites: None</p>
          <hr className="border-t-2 border- darkgray-300 mb-4" />
          {/* === Job Notification Section (Moved here) === */}
          <div className="job-notification-box">
            <h2>Stay Updated with Job Notifications</h2>
            <p>Get the latest job opportunities in the tech industry tailored to your skills.</p>
            <button className="job-notification-btn" onClick={handleJobNotificationClick}>
              View Job Notifications
            </button>
          </div>
        </div>
      </aside>

      {/* === Main Content === */}
      <main className="main-content">
        {/* === Course Intro === */}
        <section className="course-container">
          <div className="course-left">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1042/1042337.png"
              alt="Rocket Icon"
              className="course-image"
            />
            <h4 className="course-tag">LEARNING PATH</h4>
            <h1 className="course-title">Learn Python</h1>
            <p className="course-description">
              Learn to code in Python—a beginner-friendly programming language
              used in data analysis, web development, task automation, and more.
            </p>
            <div className="course-info">
              <span>📘 Level: Beginner</span>
              <span>⏱ Duration: 2 months</span>
              <span>💻 Type: Interactive</span>
              <span>🗣 Language: English</span>
              <span>🧩 Practice Problems: 220+</span>
              <span>📝 Quizzes: 80+</span>
            </div>
          </div>
        </section>

        {/* === Learning Path Overview === */}
        <section className="learning-overview">
          <h2>Learning Path Overview</h2>
          {courseTitles.map((title, index) => (
            <article className="course-box" key={index}>
              <h4>Course {index + 1}</h4>
              <h3>{title}</h3>
              <p>Course {index + 1} description goes here. Learn and practice key skills.</p>
            </article>
          ))}

          <div className="start-learning-container">
            {/* <button className="start-learning-btn" onClick={handleMenuClick}>
              Get Started Learning
            </button> */}
          </div>
        </section>

        {/* === Projects Section === */}
        <section className="projects-section">
          <h2>
            Learn practically <br />
            <span>by solving real-world problems.</span>
          </h2>
          <p className="project-subtitle">Projects you will create:</p>
          <div className="project-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.title}>
                <img src={project.img} alt={`${project.title} Icon`} />
                <div>
                  <h3>{project.title}</h3>
                  <p>Learn More →</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === Certificate Section === */}
        <section className="certificate-section-wrapper">
          <div className="certificate-section">
            <img src={certificateImg} alt="Certificate Preview" className="cert-preview" />
            <div className="cert-text">
              <h2>Claim Your Certificate</h2>
              <p>You’ll receive an industry-recognized certificate after completing the path.</p>
              <button className="claim-button" onClick={togglePopup}>
                Claim Certificate
              </button>
            </div>
          </div>
        </section>

        {/* === Certificate Preview Popup === */}
        {showPopup && (
          <div className="popup-overlay" onClick={togglePopup}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
              <img src={certificateImg} alt="Full Certificate Preview" />
              <button className="popup-close" onClick={togglePopup}>
                ×
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Enrollment;
