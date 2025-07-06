// ForgotPassword.jsx
import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = ({ onNext }) => {
  const [email, setEmail] = useState('');

  const handleSendOTP = () => {
    if (email) onNext(); // Simulate OTP sending
  };

  return (
    <div className="forgot-form">
      <h2>Forgot <span>Password?</span></h2>
      <p className="subtext">Enter your registered email to receive an OTP</p>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="pink-btn" onClick={handleSendOTP}>Send OTP</button>
    </div>
  );
};

export default ForgotPassword;
