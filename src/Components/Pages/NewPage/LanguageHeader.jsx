import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LanguageHeader.css';
import { useSelector } from 'react-redux';

export default function LanguageHeader({ tutorialName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const darkMode = useSelector((state) => state.darkMode.enabled);
  const tutorialSlug = tutorialName?.slug;

  console.log(tutorialName);

  const tabs = [
    { label: 'TUTORIALS', path: '/progamming' },
    { label: 'COURSES', path: '/course-List' },
    { label: 'ASSESSMENT', path: '/examples' },
    { label: 'REFERENCES', path: '/course-list' },
    { label: 'ONLINE COMPILER', path: '/compiler' },
  ];
 

  const handleCourseClick = (totutorialSlug, path) => {
    localStorage.setItem("selectedCourse", totutorialSlug);
    navigate(`${path}/${totutorialSlug}`);
  };
  return (
    <div className={`language-header ${darkMode ? 'dark' : ''}`}>
      <h2 className='language-header-title '> {tutorialName?.name} Programming</h2>
      <div className="language-header-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`tab-button ${location.pathname.includes(tab.path) ? 'active' : ''}`}
            onClick={() => handleCourseClick(tutorialSlug, tab.path)}>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
