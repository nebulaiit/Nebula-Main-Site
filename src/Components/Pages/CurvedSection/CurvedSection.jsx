import React from "react";
import "./CurvedSection.css";
import logo from "../../Images/Logo/neblogo.png";

const CurvedSection = () => {
  return (
    <div className="curved-section">
      <div className="curved-section-content">
        <img src={logo} alt="neblogo" className="logo" />
        <h2>Our Hands-on Coding Platform</h2>
        <p>
          <em>
            Created with a decade of experience in teaching programming and
            feedback from millions of users, Programiz PRO offers everything you
            need to learn to code in one place.
          </em>
        </p>
      </div>

      {/* Styled Horizontal Line */}
      <hr className="section-divider" />
    </div>
  );
};

export default CurvedSection;
