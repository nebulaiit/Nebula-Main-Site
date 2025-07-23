import React from 'react'

import "./AllCourses.css";
import { useSelector } from 'react-redux';

const allCourses = [
  {
    id: 1,
    title: "Python for Beginners",
    description: "Learn Python from scratch and build your first app.",
    duration: "4 weeks",
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    description: "Understand JS fundamentals and start creating dynamic websites.",
    duration: "3 weeks",
  },
  {
    id: 3,
    title: "React Development",
    description: "Build interactive UIs using React.js.",
    duration: "5 weeks",
  },
  {
    id: 4,
    title: "Intro to Machine Learning",
    description: "Dive into ML concepts and implement simple models.",
    duration: "6 weeks",
  },
  {
    id: 5,
    title: "Data Structures & Algorithms",
    description: "Master DSA to ace technical interviews.",
    duration: "6 weeks",
  },
];

const AllCourses = () => {

  const darkMode = useSelector((state) => state.darkMode.enabled);




  return (
    <div className={`all-courses ${darkMode ? 'dark' : ''}`}>
      <h2 className="tab-title">All Courses</h2>
      <p className="tab-desc">Explore your available courses here.</p>
      <div className="course-list">
        {allCourses.map((course) => (
          <div key={course.id} className="course-card ">
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <small>Duration: {course.duration}</small>
            <button className="view-btn">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;

