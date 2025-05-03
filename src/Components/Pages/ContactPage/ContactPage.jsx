import React from 'react';
import './ContactPage.css';
import { FaMapMarkerAlt, FaPhone, FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaUser, FaCommentDots, FaMailBulk } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        {/* Left Info Panel */}
        <div className="contact-info">
          <img src="https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg" alt="Team" />
          <h3>We appreciate your interest</h3>
          <div className="contact-details">
            <p><FaMailBulk /> nebulait123@gmail.com</p>
            <p><FaPhone /> 800.900.123</p>
          </div>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="contact-form">
          <h2>CONTACT  <span>US</span></h2>
          <form>
            <div className="input-group">
              <FaUser />
              <input type="text" placeholder="Name" />
            </div>
            <div className="input-group">
              <FaEnvelope />
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-group">
              <FaCommentDots />
              <textarea placeholder="Message" />
            </div>
            <button className="submit-btn" type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;