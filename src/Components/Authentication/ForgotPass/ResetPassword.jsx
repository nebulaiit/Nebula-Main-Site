
// ResetPassword.jsx
import React, { useState } from 'react';
import './ForgotPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleReset = () => {
    if (password && password === confirm) {
      alert('Password reset successful!');
    }
  };

  return (
    <div className="forgot-form">
      <h2>Reset <span>Password</span></h2>
      <p className="subtext">Enter your new password below</p>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <button className="pink-btn" onClick={handleReset}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;