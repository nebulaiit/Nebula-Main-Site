import React from 'react'
import "./MyLists.css";

const myCourseLists = [
  {
    id: 1,
    title: "Web Development Essentials",
    description: "Frontend and backend dev using HTML, CSS, JS, Node.js.",
    courseCount: 7,
  },
  {
    id: 2,
    title: "Data Science Path",
    description: "Master Python, statistics, ML & data analysis.",
    courseCount: 5,
  },
  {
    id: 3,
    title: "Interview Preparation",
    description: "Sharpen DSA and system design for interviews.",
    courseCount: 6,
  },
];

const MyLists = () => {
  return (
    <div className="my-lists-wrapper">
      <h2 className="tab-title">My Lists</h2>
      <p className="tab-desc">Your saved course collections appear here.</p>
      <div className="my-lists">
        {myCourseLists.map((list) => (
          <div className="list-card" key={list.id}>
            <h3>{list.title}</h3>
            <p>{list.description}</p>
            <p><strong>{list.courseCount}</strong> courses</p>
            <div className="list-actions">
              <button className="btn-view">View List</button>
              <button className="btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLists;
