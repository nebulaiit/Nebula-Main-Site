import React from 'react';
import { useParams } from 'react-router-dom';
import './CoursePage.css';
import LazyImage from '../../LazyImage';

const courseContent = {
  Python: {
    title: "Python Programming",
    description: "Python is a powerful, easy-to-learn programming language used for web development, data analysis, AI, and more.",
    image: "https://via.placeholder.com/400x180?text=Python+Course",
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
    image: "https://via.placeholder.com/400x180?text=JavaScript+Course",
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
      {/* Lazy loaded course image */}
      {course.image && (
        <div style={{ margin: "20px 0" }}>
          <LazyImage src={course.image} alt={course.title} style={{ maxWidth: "100%", borderRadius: "12px" }} />
        </div>
      )}
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