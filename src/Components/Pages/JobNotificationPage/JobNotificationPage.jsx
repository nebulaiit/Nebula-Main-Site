// JobNotification.jsx
import React, { useState } from 'react';
import './JobNotificationPage.css';
import JobCard from './JobCard';
import ATSChecker from './Resume/Resume';
import ComingSoon from '../../ComingSoon/ComingSoon';
import { useSelector } from 'react-redux';
import MockInterView from './MockInterview/MockInterview'

const tabs = [
  'NEW JOBS OPENINGS',
  'APPLIED JOBS',
  'INTERVIEW PREP',
  'RESUME BUIDLING',
  
];

const JobNotification = () => {
  const [activeTab, setActiveTab] = useState('NEW JOBS OPENINGS');
    const darkMode = useSelector((state) => state.darkMode.enabled);    


  return (
    <div className={`job-notification-wrapper ${darkMode ? 'dark' : ''}`}>
      <div className="job-header ">
        <h1>JOB NOTIFICATION <span role="img" aria-label="briefcase">💼</span> <span role="img" aria-label="chart">📊</span></h1>
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

      <div className="tab-content">
        <h3>{activeTab}</h3>

        {activeTab === 'NEW JOBS OPENINGS' && (
          <div className="job-card-list">
     
            <JobCard />
          </div>
        )}

        {activeTab === 'RESUME BUIDLING' && (
          <div className="job-card-list">
            <ATSChecker/>
          </div>
        )}
        {activeTab === 'INTERVIEW PREP' && (
          <div className="job-card-list">
            {/* <ComingSoon/> */}
            <MockInterView/>
          </div>
        )}
       

        {/* You can add content logic for other tabs as needed */}

      </div>
    </div>
  );
};

export default JobNotification;
