import React from 'react';
import './TabSection.css';

const TabSection = ({ tabContent, activeTab, setActiveTab }) => {
  const content = tabContent[activeTab];

  return (
    <div className="course-tab-wrapper">
      <div className="course-tab-header">
        {Object.keys(tabContent).map(tab => (
          <button
            key={tab}
            className={`course-tab-btn ${tab === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="course-tab-body">
        {activeTab === 'Overview' && (
          <div className="overview-section">
            <h2>{content.title}</h2>
            <p className="overview-description">{content.description}</p>

            <h3>What you'll learn</h3>
            <ul className="overview-learn-list">
              {content.objectives.map((point, i) => (
                <li key={i}>✅ {point}</li>
              ))}
            </ul>

            <h3>Requirements</h3>
            <ul className="overview-req-list">
              {content.requirements.map((req, i) => (
                <li key={i}>📌 {req}</li>
              ))}
            </ul>

            <h3>Who this course is for</h3>
            <p className="overview-audience">{content.audience}</p>
          </div>
        )}

        {activeTab === 'Instructor' && (
          <div className="instructor-section">
            <img src={content.image} alt="Instructor" className="instructor-image" />
            <h3>{content.name}</h3>
            <p className="instructor-title">{content.title}</p>
            <p className="instructor-bio">{content.bio}</p>
            <div className="instructor-links">
              <a href={content.links.linkedin} target="_blank" rel="noreferrer">🔗 LinkedIn</a>
              <a href={content.links.github} target="_blank" rel="noreferrer">💻 GitHub</a>
            </div>
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div className="reviews-section">
            <h3>⭐ {content.averageRating} ({content.totalReviews} reviews)</h3>
            {content.comments.map((review, idx) => (
              <div key={idx} className="review-card">
                <h4>{review.name}</h4>
                <p>{review.comment}</p>
                <p>Rating: {"⭐".repeat(Math.round(review.rating))}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Resources' && (
          <div className="resources-section">
            <h3>Downloadable Assets</h3>
            <ul className="resource-download-list">
              {content.downloadableAssets.map((asset, idx) => (
                <li key={idx}><a href={asset.link} download>{asset.name}</a></li>
              ))}
            </ul>

            <h3>External Resources</h3>
            <ul className="resource-external-links">
              {content.externalLinks.map((link, idx) => (
                <li key={idx}><a href={link.url} target="_blank" rel="noreferrer">{link.label}</a></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSection;