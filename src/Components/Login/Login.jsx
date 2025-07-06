import React, { useState } from 'react';
import './Login.css';
import studentImg from '../Images/Logo/login.png';
import { Link } from 'react-router-dom';


const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="login-wrapper">
      <div className="login-image animated-img">
        <img src={studentImg} alt="IT Student" />
      </div>

      <div className="form-layer">
        <div className={`login-form-layer ${!isSignUp ? 'active' : ''}`}>
          <h2>Welcome to <span>IT Portal</span></h2>
          <input type="text" placeholder="Username or Email" />
          <input type="password" placeholder="Password" />
          <button className="login-btn">Log In</button>
       <div className="options">
      <Link to="/forgot-password">Forgot password?</Link>
</div>
          <p style={{ textAlign: 'center' }}>or continue with</p>
          <div className="social-login">
            <button className="google">G</button>
            <button className="facebook">f</button>
          </div>
          <p className="signup-link">
            New here? <span onClick={() => setIsSignUp(true)}>Create an account</span>
          </p>
        </div>

        <div className={`login-form-layer ${isSignUp ? 'active' : ''}`}>
          <h2>Join <span>IT Portal</span></h2>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="login-btn">Sign Up</button>
          <p className="signup-link">
            Already have an account? <span onClick={() => setIsSignUp(false)}>Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
