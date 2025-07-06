// OTPVerification.jsx
import React, { useState } from 'react';
import './ForgotPassword.css';

const OTPVerification = ({ onNext }) => {
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = () => {
    if (otp === '123456') onNext(); // Simulated verification
  };

  return (
    <div className="forgot-form">
      <h2>Verify <span>OTP</span></h2>
      <p className="subtext">Enter the 6-digit code sent to your email</p>
      <input
        type="text"
        maxLength={6}
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className="pink-btn" onClick={handleVerifyOTP}>Verify OTP</button>
    </div>
  );
};

export default OTPVerification;
