import React, { useState } from 'react';
import './ContactPage.css';
import { useSelector } from 'react-redux';


const ContactPage = () => {

  const darkMode = useSelector((state) => state.darkMode.enabled);
  const user = useSelector((state) => state.user.user);


  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
    } catch (error) {
      console.error('Error sending WhatsApp message', error);
      alert('Failed to send WhatsApp message.');
    }
  };
  const handleWhatsAppClick = () => {
    console.log('User clicked WhatsApp contact button');

    const phone = '918793905753';

    const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
    const email = user?.email ?? '';

    const preFilledMessage = `Hi QubitronX Team, I'm ${fullName} (${email}). I'd like to know more about your courses.`;
    const encodedMessage = encodeURIComponent(preFilledMessage);

    const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;

    const newWindow = window.open(whatsappURL, '_blank');

    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      alert('It seems WhatsApp is not installed or pop-ups are blocked. Please contact us directly at 8793905753.');
    }
  };



  return (
    <div className={`contact-page  ${darkMode ? 'dark' : ''}`}>
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
        <div
          className="card"
          onClick={handleWhatsAppClick}
          style={{ cursor: 'pointer' }}
        >
          <i className="fa-brands fa-whatsapp"></i>
          <h3>WhatsApp</h3>
          <p>Chat with us on WhatsApp</p>
        </div>


        <div className="form-map-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Fill out the Form</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <div className="phone-input">
              <select
                className="select-phone-no"
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleChange}
              >
                <option value="IN">+91 (India)</option>
                <option value="US">+1 (USA)</option>
              </select>
              <input
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>

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
    </div>
  );
};

export default ContactPage;
