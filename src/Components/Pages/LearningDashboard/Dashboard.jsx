import React from 'react'
import "./Dashboard.css";
import { useSelector } from 'react-redux';
import LazyImage from '../../LazyImage';

const Dashboard = () => {
  const stats = { total: 12, completed: 5, inProgress: 4 };
  const learning = [
    { id: 1, title: "React for Beginners", progress: 60, thumbnail: "https://via.placeholder.com/300x140?text=React" },
    { id: 2, title: "Python Fundamentals", progress: 40, thumbnail: "https://via.placeholder.com/300x140?text=Python" },
  ];
  const achievements = [
    { id: 1, title: "Python Beginner Badge", date: "Mar 2025", icon: "https://via.placeholder.com/48x48?text=Py" },
    { id: 2, title: "100 Days of Code Streak", date: "Feb 2025", icon: "https://via.placeholder.com/48x48?text=100" },
  ];

  const darkMode = useSelector((state) => state.darkMode.enabled);

  return (
    <div className={`dashboard-section ${darkMode ? 'dark' : ''}`}>
      <h2 className="tab-title">🎓 Your Learning Dashboard</h2>
      <div className="stats-cards">
        <div className="stat-card"><h4>{stats.total}</h4><p>Total Courses</p></div>
        <div className="stat-card"><h4>{stats.completed}</h4><p>Completed</p></div>
        <div className="stat-card"><h4>{stats.inProgress}</h4><p>In Progress</p></div>
      </div>
      <div className="learning-grid">
        {learning.map((c) => (
          <div key={c.id} className="learning-card">
            {/* Lazy loaded course thumbnail */}
            {c.thumbnail && (
              <LazyImage src={c.thumbnail} alt={c.title} style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }} />
            )}
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
            {/* Lazy loaded badge icon */}
            {badge.icon ? (
              <LazyImage src={badge.icon} alt={badge.title} style={{ width: 48, height: 48, borderRadius: "50%" }} />
            ) : (
              <div className="badge-icon">🏆</div>
            )}
            <strong>{badge.title}</strong>
            <p><em>{badge.date}</em></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;