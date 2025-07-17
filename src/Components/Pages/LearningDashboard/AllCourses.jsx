import React from 'react'

import "./AllCourses.css";

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
  const handleAddToCart = (course) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (existingCart.some((c) => c.id === course.id)) {
      alert("Course already in cart");
      return;
    }
    const updated = [...existingCart, course];
    localStorage.setItem("cart", JSON.stringify(updated));
    alert("Course added to cart!");
  };

  return (
    <div className="all-courses glassmorphism">
      <h2 className="tab-title">All Courses</h2>
      <p className="tab-desc">Explore your available courses here.</p>
      <div className="course-list">
        {allCourses.map((course) => (
          <div key={course.id} className="course-card ">
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <small>Duration: {course.duration}</small>
            <button className="enroll-btn" onClick={() => handleAddToCart(course)}>
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;

