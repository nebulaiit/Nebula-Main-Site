// Components/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

const Sidebar = ({
  courseSections,
  selectedLessons,
  expandedSection,
  handleSectionClick,
  toggleLesson
}) => {
  return (
    <div className="sidebar-container">
      <h2>Course Content</h2>
      {courseSections.map((section, sIdx) => (
        <div key={sIdx} className={`section ${expandedSection === sIdx ? 'expanded' : ''}`}>
          <div className="section-title" onClick={() => handleSectionClick(sIdx)}>
            <h4>{section.title}</h4>
            <span>{expandedSection === sIdx ? '−' : '+'}</span>
          </div>
          {expandedSection === sIdx && (
            <ul className="lesson-list">
              {section.lessons.map((lesson, lIdx) => (
                <li
                  key={lIdx}
                  className={`lesson ${
                    selectedLessons[sIdx]?.has(lIdx) ? 'active' : ''
                  }`}
                  onClick={() => toggleLesson(sIdx, lIdx)}
                >
                  ▶ {lesson}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;