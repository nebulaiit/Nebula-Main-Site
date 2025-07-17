import React from 'react';
import './ComingSoon.css';
import { useSelector } from 'react-redux';

export default function ComingSoon() {
  const darkMode = useSelector((state) => state.darkMode.enabled);

  return (
    <div className={`coming-soon-wrapper ${darkMode ? 'dark' : ''}`}>
      <div className="content">
        <h1>🚧 Coming Soon</h1>
        <p>We're working hard to launch this page. Stay tuned!</p>
        <div className="loader"></div>
      </div>
    </div>
  );
}
