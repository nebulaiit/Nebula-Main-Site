import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LanguageHeader.css';

export default function LanguageHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: 'TUTORIALS', path: '/progamming' },
    { label: 'COURSES', path: '/course' },
    { label: 'EXAMPLES', path: '/examples' }, 
    { label: 'REFERENCES', path: '/course-list' },
    { label: 'ONLINE COMPILER', path: '/compiler' },
  ];
const courseName =  localStorage.getItem("selectedCourse");

const handleCourseClick = (courseName , path) => {
  localStorage.setItem("selectedCourse", courseName);
   navigate(`${path}/${courseName}`);
};
  return (
    <div className="language-header">
      <h2>Learn {courseName} programming</h2>
      <div className="language-header-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`tab-button ${location.pathname.includes(tab.path) ? 'active' : ''}`}
            onClick={() => handleCourseClick(courseName, tab.path)}>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
