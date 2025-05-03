import React from 'react';
import LanguageHeader from './LanguageHeader'; // ✅ Should be in same folder
import './NewPage.css';

export default function NewPage() {
  return (
    <div>
      {/* Top Language Header Section */}
      <LanguageHeader />

      {/* Course Card Section */}
      <div className="course-card">
        <div className="course-left">
          <p className="recommended">Recommended Course:</p>
          <h2>Master Python Programming</h2>
          <p>Perfect for beginners serious about building a career in Python.</p>
          <p>Created by the Programiz team with over a decade of experience.</p>
          <button className="try-btn">Try Now</button>
        </div>

        <div className="course-right">
          <p>👥 Enrollment: 317k</p>
          <p>📘 Practice Problems: 239+</p>
          <p>🚀 Projects: 5+</p>
          <p>🎓 Certifications</p>
        </div>
      </div>
    </div>
  );
}
