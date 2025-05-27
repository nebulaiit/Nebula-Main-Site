 import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./thankyou.css";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get course data from location.state passed from PaymentPage on success
  const purchasedCourse = location.state?.course;

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleGoToDashboard = () => {
    // Navigate to Dashboard and pass purchasedCourse as state
    navigate("/learning-dashboard?section=dashboard", { state: { course: purchasedCourse } });
  };

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <div className="checkmark">✔</div>
        <h1>Payment Successful</h1>
        <p>Thank you for your purchase!</p>
        <p>You now have full access to your course.</p>
        <div className="buttons">
          <button className="home-button" onClick={handleBackToHome}>
            ⬅ Back to Home
          </button>
          <button
            className="dashboard-button"
            onClick={handleGoToDashboard}
            disabled={!purchasedCourse}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
