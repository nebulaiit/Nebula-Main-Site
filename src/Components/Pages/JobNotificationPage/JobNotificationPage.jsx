import React, { useState } from 'react';
import './JobNotificationPage.css';

export default function JobNotificationPage() {
  const [activeTab, setActiveTab] = useState('NEW JOBS');

  const tabs = ['NEW JOBS', 'JOB ALERTS', 'COMPANY UPDATES', 'APPLY NOW', 'SETTINGS'];

  return (
    <div className="job-notification-page">
      {/* Job Notification Header */}
      <div className="job-notification-header">
        <h2>Job Notification 💼  📊 </h2>
        <div className="job-notification-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'active-tab' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Add your content here */}
      <div className="job-content">
        {/* Content for each tab will be rendered here */}
        <h3>Active Tab: {activeTab}</h3>
      </div>
    </div>
  );
}
