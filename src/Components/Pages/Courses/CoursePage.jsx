import React from 'react';
import { useParams } from 'react-router-dom';
import './CoursePage.css';

const courseContent = {
  Python: {
    title: "Python Programming",
    description: "Python is a powerful, easy-to-learn programming language used for web development, data analysis, AI, and more.",
    topics: [
      "Variables & Data Types",
      "Control Flow (if, else, loops)",
      "Functions",
      "Lists & Dictionaries",
      "OOP in Python",
      "Modules and Packages"
    ]
  },
  JavaScript: {
    title: "JavaScript Basics",
    description: "JavaScript is the language of the web. Learn how to make websites interactive using JS.",
    topics: [
      "Variables (let, const)",
      "Functions & Events",
      "DOM Manipulation",
      "ES6+ Features",
      "APIs & Fetch"
    ]
  },
  // Add more courses here like SQL, HTML, C++, etc.
};

export default function CoursePage() {
  const { courseName } = useParams();
  const course = courseContent[courseName];

  if (!course) {
    return <h2 style={{ textAlign: 'center' }}>Course "{courseName}" not found.</h2>;
  }

  return (
    <div className="course-detail-container">
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <h3>Topics Covered:</h3>
      <ul>
        {course.topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
}

