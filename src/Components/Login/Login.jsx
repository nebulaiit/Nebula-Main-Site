import React, { useState } from 'react';
import { loginUser, signUpUser } from '../APIService/apiservice';
import './Login.css';

const Login = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(values);
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token);

      alert('Login successful!');
    }
    catch (error) {
      setLoginError(error.message);
    }
  };

  const handleSignUp = async (e) => {
  e.preventDefault();
  try {
    const data = await signUpUser(values);  
    console.log('Signup successful:', data);
    // localStorage.setItem('token', data.token);
    
    alert('Signup successful!');
  } catch (error) {
      setSignUpError(error.message);
     
  }
};


  return (
    <div className={`container login-container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form>
        <form onSubmit={handleSignUp}>

          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>

          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form>


          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="username" name="userName" value={values.userName} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="email" name="email" value={values.email || ''} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="password" name="password" value={values.password} onChange={handleChange} required />
          </div>

          <button type="submit"  className="sign-up-btn" >Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>

          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button>Sign In</button>

          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="username" name="userName" value={values.userName} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="password" name="password" value={values.password} onChange={handleChange} required />
          </div>
          {/* {loginError && <p className="error">{loginError}</p>} */}
          <a href="#">Forgot your password?</a>
          <button type="submit"  className="sign-in-btn">Sign In</button>

        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={() => setIsSignUpActive(false)}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" onClick={() => setIsSignUpActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
