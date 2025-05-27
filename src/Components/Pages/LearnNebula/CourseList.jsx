import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library } from '@fortawesome/fontawesome-svg-core';
import { faPython, faJs, faJava, faHtml5, faCss3, faReact  } from '@fortawesome/free-brands-svg-icons';
import {  faDatabase} from '@fortawesome/free-solid-svg-icons';

import './CourseList.css';
import { getAllTutorial } from '../../APIService/apiservice';

// Add icons to the library
library.add(faPython, faJs, faJava, faHtml5, faCss3, faDatabase, faReact);

export default function CourseList() {
  const navigate = useNavigate();

  const [courses ,setCourses]  = useState([]);

  const handleCourseClick = (tutorialName) => {
    localStorage.setItem("selectedCourse", tutorialName);
    navigate(`/course/${tutorialName}`);
  };

  const iconMap = {
    "Python": { icon: "python", type: "fab" },
    "MySql": { icon: "database", type: "fas" },
    "Java": { icon: "java", type: "fab" },
    "React.js": { icon: "react", type: "fab" },
    "HTML":{ icon: "html5", type: "fab"},
    "CSS":{ icon: "css3", type: "fab"}
    // Add more as needed
  };

  useEffect(()=>{

    const fetchTutorialList = async () =>{
      try {

        const response = await getAllTutorial();

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
  }, [])

  return (
    <div className="course-section  ">
      <h2 className="title">
      👩🏻‍💻 Learn Nebula <span className="highlight">for Free</span>
      </h2>
      <br></br>
      <p className="subtitle">
        Quick-read tutorials with code examples that you can run and copy—perfect for self-paced learning.
      </p>

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
