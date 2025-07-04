import React from 'react'

import "./Dashboard.css";

const stats = { total: 12, completed: 5, inProgress: 4 };
const learning = [
  { id: 1, title: "React for Beginners", progress: 60 },
  { id: 2, title: "Python Fundamentals", progress: 40 },
];
const achievements = [
  { id: 1, title: "Python Beginner Badge", date: "Mar 2025" },
  { id: 2, title: "100 Days of Code Streak", date: "Feb 2025" },
];

const Dashboard = () => {
  return (
    <div className="dashboard-section">
      <h2 className="tab-title">🎓 Your Learning Dashboard</h2>
      <div className="stats-cards">
        <div className="stat-card"><h4>{stats.total}</h4><p>Total Courses</p></div>
        <div className="stat-card"><h4>{stats.completed}</h4><p>Completed</p></div>
        <div className="stat-card"><h4>{stats.inProgress}</h4><p>In Progress</p></div>
      </div>
      <div className="learning-grid">
        {learning.map((c) => (
          <div key={c.id} className="learning-card">
            <div className="card-header"><strong>{c.title}</strong></div>
            <div className="progress-wrapper">
              <div className="progress-bar">
                <div className="progress" style={{ width: `${c.progress}%` }}></div>
              </div>
              <span>{c.progress}% completed</span>
            </div>
            <button className="resume-btn">Resume Course</button>
          </div>
        ))}
      </div>
      <div className="achievements-grid">
        {achievements.map((badge) => (
          <div key={badge.id} className="badge-card">
            <div className="badge-icon">🏆</div>
            <strong>{badge.title}</strong>
            <p><em>{badge.date}</em></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
