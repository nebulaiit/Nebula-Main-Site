// src/Components/Pages/thankyou/thankyou.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./thankyou.css"; // Create this CSS file for styling

const ThankYou = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); // goes to Home.jsx
  };

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <div className="checkmark">✔</div>
        <h1>Payment Successful</h1>
        <p>Thank you for your purchase!</p>
        <p>You now have full access to your course.</p>
        <button className="home-button" onClick={handleBackToHome}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
