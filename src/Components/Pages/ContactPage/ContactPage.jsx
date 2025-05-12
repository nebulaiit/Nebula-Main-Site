import React from 'react';
import './ContactPage.css';

const ContactPage = () => {


  
  return (
    <div className="contact-page">
      
      <div className="top-banner">
        <h1>Contact us for Query</h1>    
        <p>Get course info or talk with us to fulfill your project requirements and see how we can help you</p>
      </div>

      <div className="info-cards">
        <div className="card">
          <i className="fas fa-phone"></i>
          <h3>Talk to us</h3>
          <p>+91 9977665544</p>
          <small>Everyday, 10 am to 9 pm</small>
        </div>
        <div className="card">
          <i className="fas fa-envelope"></i>
          <h3>Mail us</h3>
          <p>Nebulait@gmail.com</p>
          <small>Send your query anytime</small>
        </div>
        <div className="card">
          <i className="fas fa-map-marker-alt"></i>
          <h3>Locate us</h3>
          <p>Badlapur, Mumbai</p>
          <small>Maharashtra, India</small>
        </div>
      </div>

      <div className="form-map-section">

        <form className="contact-form">
          <h2>Fill out the Form</h2>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />

          <div className="phone-input">
            <select className='select-phone-no'>
              <option value="IN">IN</option>
              <option value="IN">USA</option>
            </select>
            <input type="text" placeholder="Enter Phone Number " required />
          </div>
          
          <textarea placeholder="Message" rows="4" required></textarea>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
        <div className="map-container">
          <iframe
            title="Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.349103445938!2d73.2399758746349!3d19.15500125028122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be79df31f9ef6d3%3A0xb2f58f41f3bdb4aa!2sBadlapur%2C%20Maharashtra%20421304!5e0!3m2!1sen!2sin!4v1714290134030!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;