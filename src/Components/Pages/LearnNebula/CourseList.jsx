import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPython, faJs, faJava, faHtml5, faCss3, faReact } from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

import './CourseList.css';
import { getAllTutorial } from '../../APIService/apiservice';

// Add icons to the library
library.add(faPython, faJs, faJava, faHtml5, faCss3, faDatabase, faReact);

export default function CourseList() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "Every great developer you know got there by solving problems they were unqualified to solve — until they actually did it.",
    "Learning to write programs stretches your mind, and helps you think better. – Bill Gates",
    "Code is not just code, it’s your superpower in the digital world.",
    "The best way to predict the future is to create it — with code.",
    "Stay curious. Keep building. One line of code at a time.",
    "Dream in code. Build with purpose. Deploy with confidence."
  ];

  const handleCourseClick = (tutorialName) => {
    localStorage.setItem("selectedCourse", tutorialName);
    navigate(`/course/${tutorialName}`);
  };

  const iconMap = {
    "Python": { icon: "python", type: "fab" },
    "MySql": { icon: "database", type: "fas" },
    "Java": { icon: "java", type: "fab" },
    "React.js": { icon: "react", type: "fab" },
    "HTML": { icon: "html5", type: "fab" },
    "CSS": { icon: "css3", type: "fab" }
    // Add more as needed
  };



  useEffect(() => {

    const fetchTutorialList = async () => {
      try {

        const response = await getAllTutorial();
        console.log("Fetched courses:", response);

        // Map each tutorialName to icon & type
        const mappedCourses = response.map(course => {
          const iconInfo = iconMap[course.tutorialName] || { icon: "question", type: "fas" }; // fallback icon
          return {
            ...course,
            icon: iconInfo.icon,
            type: iconInfo.type
          };
        });
        setCourses(mappedCourses)

      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchTutorialList();
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);

    return () => clearInterval(quoteInterval);
  }, [])

  return (
    <div className="course-section  ">
      <AnimatedHeading
        emoji="🚀"
        text="Welcome to Qubitron X"
        highlight="Next-Gen Learning"
      />

      <p className="quote fade-in-up">{quotes[quoteIndex]}</p>

      <div className="course-button-container">
        {courses.map((course, index) => (
          <button
            className="course-btn"
            key={index}
            onClick={() => handleCourseClick(course.tutorialName)}
          >
            <FontAwesomeIcon
              icon={[course.type, course.icon]}
              className="course-icon"
            />
            {course.tutorialName}
          </button>
        ))}
      </div>

      {/* Styled line */}
      <hr className="section-divider" />
    </div>
  );
}

const AnimatedHeading = ({ emoji, text, highlight }) => {
  return (
    <h2 className="animated-title">
      <span className="emoji">{emoji}</span>{' '}
      {text} <span className="highlight">{highlight}</span>
    </h2>
  );
};
