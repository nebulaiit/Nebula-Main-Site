// Fixed and cleaned version of your Login.jsx
import React, { useState } from 'react';
import { loginUser, signUpUser } from '../APIService/apiservice';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../../redux/authSlice';
import { fetchUserDetails } from '../../redux/userSlice';
import { showToast } from '../../redux/toastSlice';
import studentImg from '../Images/Logo/login.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(values);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      dispatch(setAuthData({ token: data.token, userId: data.userId }));
      dispatch(fetchUserDetails(data.userId));
      dispatch(showToast({ message: 'Login successful!', type: 'success' }));
      navigate('/');
    } catch (error) {
      dispatch(showToast({ message: error.message || 'Login failed', type: 'error' }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = await signUpUser(values);
      alert('Signup successful!');
    } catch (error) {
      dispatch(showToast({ message: error.message || 'Signup failed', type: 'error' }));
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-image animated-img">
        <img src={studentImg} alt="IT Student" />
      </div>

      <div className="form-layer">
        <div className={`login-form-layer ${!isSignUp ? 'active' : ''}`}>
          <h2>Welcome to <span>IT Portal</span></h2>
          <form onSubmit={handleLogin}>
            <input type="text" name="userName" placeholder="Username or Email" value={values.userName} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} required />
            <button className="login-btn" type="submit">Log In</button>
          </form>
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
          <form onSubmit={handleSignUp}>
            <input type="text" name="userName" placeholder="Full Name" value={values.userName} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} required />
            <button className="login-btn" type="submit">Sign Up</button>
          </form>
          <p className="signup-link">
            Already have an account? <span onClick={() => setIsSignUp(false)}>Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
