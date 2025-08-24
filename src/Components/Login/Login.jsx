import React, { useState } from 'react';
import { loginUser,  signUpUserWithGoogle,signUpUser } from '../APIService/apiservice';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthData } from '../../redux/authSlice';
import { fetchUserDetails } from '../../redux/userSlice';
import { showToast } from '../../redux/toastSlice';
import studentImg from '../Images/Logo/login.png';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const Login = () => {
  const [view, setView] = useState('login');
  const [verificationCode, setVerificationCode] = useState('');
  const [tempUserEmail, setTempUserEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.enabled);

  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });



  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(loginData);
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
    console.log(signUpData)
    try {
       const response = await signUpUser(signUpData);

      if (response.status === 201) {
        // ✅ Manual signup
        if (signUpData.password !== 'google-oauth') {
          setTempUserEmail(signUpData.email);
          dispatch(showToast({
            message: 'Signup successful! Check your email for the verification code.',
            type: 'info'
          }));
          setView('verify');
        }
      } else {
        // unexpected but safe fallback
        dispatch(showToast({
          message: 'Unexpected response from server.',
          type: 'warning'
        }));
      }
    } catch (error) {
      // If backend sent 400 → axios/fetch throws → handle here
      dispatch(showToast({
        message: error.response?.data?.message || 'Signup failed',
        type: 'error'
      }));
    }
  };


  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyEmailCode(tempUserEmail, verificationCode);
      dispatch(showToast({ message: 'Email verified! Please login.', type: 'success' }));
      setView('login');
    } catch (error) {
      dispatch(showToast({ message: error.message || 'Invalid code', type: 'error' }));
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      const accessToken = tokenResponse.access_token;

      const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const decoded = res.data;

      const googleUserData = {
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        email: decoded.email,
        password: 'google-oauth',
        phoneNumber: '',
      };

      const backendRes = await signUpUserWithGoogle(googleUserData);
      console.log('Google login response:', backendRes);

      dispatch(setAuthData({ token: backendRes.token, userId: backendRes.userId }));
      dispatch(fetchUserDetails(backendRes.userId));
      dispatch(showToast({ message: 'Logged in with Google!', type: 'success' }));
      navigate('/');
    } catch (error) {
      dispatch(showToast({ message: error.message || 'Google login failed', type: 'error' }));
    }
  };


  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => dispatch(showToast({ message: "Google login failed", type: "error" }))
  });

  return (
    <div className={`login-wrapper ${darkMode ? 'dark' : ''}`}>
      <div className="login-image animated-img">
        <img src={studentImg} alt="IT Student" />
      </div>

      <div className="form-layer">
        {/* Login */}
        {view === 'login' && (
          <div className="login-form-layer active">
            <h2>Welcome to <span>QubitronX</span></h2>
            <form onSubmit={handleLogin}>
              <input type="text" name="userName" placeholder="Username or Email" value={loginData.userName} onChange={handleLoginChange} required />
              <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
              <button className="login-btn" type="submit">Log In</button>
            </form>
            <div className="options">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <p className='continue-option'>or continue with</p>
            <div className="social-login">
              <button onClick={loginWithGoogle} className="google-btn">
                <FcGoogle style={{ fontSize: '20px' }} />

              </button>
              <button className="facebook">f</button>
            </div>
            <p className="signup-link">
              New here? <span onClick={() => setView('signup')}>Create an account</span>
            </p>
          </div>
        )}

        {/* Signup */}
        {view === 'signup' && (
          <div className="login-form-layer active">
            <h2>Join <span>QubitronX</span></h2>
            <form onSubmit={handleSignUp}>
              <div className="d-flex" style={{ gap: '10px' }}>
                <input type="text" name="firstName" placeholder="First Name" value={signUpData.firstName} onChange={handleSignUpChange} required />
                <input type="text" name="lastName" placeholder="Last Name" value={signUpData.lastName} onChange={handleSignUpChange} required />
              </div>
              <input type="email" name="email" placeholder="Email" value={signUpData.email} onChange={handleSignUpChange} required />
              <div className="d-flex" style={{ gap: '10px' }}>
                <input type="text" name="phoneNumber" placeholder="Phone Number" value={signUpData.phoneNumber} onChange={handleSignUpChange} required />
                <input type="password" name="password" placeholder="Password" value={signUpData.password} onChange={handleSignUpChange} required />
              </div>
              <button className="login-btn" type="submit">Sign Up</button>
              <p className='continue-option'>or continue with</p>
              <div className="social-login">
                <button onClick={loginWithGoogle} className="google-btn">
                  <FcGoogle style={{ fontSize: '20px' }} />

                </button>
                <button className="facebook">f</button>
              </div>
            </form>
            <p className="signup-link">
              Already have an account? <span onClick={() => setView('login')}>Log in</span>
            </p>
          </div>
        )}

        {/* Email Verification */}
        {view === 'verify' && (
          <div className="login-form-layer active">
            <h2>Verify Your Email</h2>
            <p>We sent a verification code to: <strong>{tempUserEmail}</strong></p>
            <form onSubmit={handleVerify}>
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <button className="login-btn" type="submit">Verify</button>
            </form>
            <p className="signup-link">
              Already verified? <span onClick={() => setView('login')}>Login now</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
