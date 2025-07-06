import React, { useState, useEffect, useRef } from 'react';
import './JobNotificationPage.css';
import JobCard from './JobCard';
import ATSChecker from './Resume/Resume';

const tabs = [
  'NEW JOBS OPENINGS',
  'APPLIED JOBS',
  'INTERVIEW PREP',
  'RESUME BUIDLING'
];

const JobNotification = () => {
  const [activeTab, setActiveTab] = useState('NEW JOBS OPENINGS');
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-section");
          } else {
            entry.target.classList.remove("fade-in-section");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, [activeTab]);

  return (
    <div className="job-notification-wrapper">
      <div className="job-header">
        <h1>
          JOB NOTIFICATION <span role="img" aria-label="briefcase">💼</span>{' '}
          <span role="img" aria-label="chart">📊</span>
        </h1>
        <div className="job-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-buttons ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="tab-content" ref={contentRef}>
        <h3> {activeTab}</h3>

        {activeTab === 'NEW JOBS OPENINGS' && (
          <div className="job-card-list">
            <JobCard />
          </div>
        )}

        {activeTab === 'RESUME BUIDLING' && (
          <div className="job-card-list">
            <ATSChecker />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobNotification;
