import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPython, faJs, faJava, faHtml5, faCss3, faSwift, faRust
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase, faCode, faHashtag
} from '@fortawesome/free-solid-svg-icons';

import './Examples.css';

// Add icons to the library
library.add(faPython, faJs, faJava, faHtml5, faCss3, faSwift, faRust, faDatabase, faCode, faHashtag);

export default function Examples() {
  const navigate = useNavigate();

  const courses = [
    { name: "Python", icon: "python", type: "fab" },
    { name: "SQL", icon: "database", type: "fas" },
    { name: "R", icon: "hashtag", type: "fas" },
    { name: "HTML", icon: "html5", type: "fab" },
    { name: "CSS", icon: "css3", type: "fab" },
    { name: "JavaScript", icon: "js", type: "fab" },
    { name: "Java", icon: "java", type: "fab" },
    { name: "C", icon: "code", type: "fas" },
    { name: "Cpp", icon: "code", type: "fas" },
    { name: "C#", icon: "hashtag", type: "fas" },
    { name: "Swift", icon: "swift", type: "fab" },
    { name: "Rust", icon: "rust", type: "fab" },
    { name: "DSA", icon: "code", type: "fas" },
  ];

  const handleClick = (courseName) => {
    let folderName = courseName;
    let fileName = courseName;

    // Special case for "R"
    if (courseName === "R") {
      folderName = "Ruby";
      fileName = "Ruby";
    }

    navigate(`/tutorial/${folderName}/${fileName}Examples`);
  };

  return (
    <div className="exampleShowcase-section">
      <h2> 🚀Examples by Language</h2>
      <p>Select a language to view practical code examples.</p>

      <div className="exampleShowcase-grid">
        {courses.map((course, index) => (
          <button
            key={index}
            onClick={() => handleClick(course.name)}
          >
            <FontAwesomeIcon icon={[course.type, course.icon]} />
            {course.name}
          </button>
        ))}
      </div>
    </div>
  );
}
