import React from 'react';
import './AboutPage.css';

export default function AboutAgencyPage() {
  return (
    <div className="about-agency-container">
      <div className="about-agency-grid">
        {/* Left Image */}
        <div className="about-agency-image">
          <span className="image-text">570 x 420</span>
        </div>

        {/* Right Content */}
        <div>
          <h4 className="agency-subtitle">We Are Creative Agency</h4>
          <h2 className="agency-title">About Agency</h2>

          <p className="agency-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. is simply dummy text of the printing and typesetting industry.
          </p>

          <div className="agency-card">
            <div className="agency-card-content">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
            </div>
          </div>

          {/* Author Section */}
          <div className="agency-author">
            <div className="agency-avatar">80 x 80</div>
            <div>
              <h4 className="author-name">Moana Smile</h4>
              <p className="author-role">
                Founder of <span className="author-company">Niwax</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
