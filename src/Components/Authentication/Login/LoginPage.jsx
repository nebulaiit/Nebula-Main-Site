import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';


export default function LoginPage({ setView }) {
    const [loginData, setLoginData] = useState({ userName: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const darkMode = useSelector((state) => state.darkMode.enabled);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(loginData);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);

            dispatch(setAuthData({ token: data.token, userId: data.userId }));
            dispatch(fetchUserDetails(data.userId));
            dispatch(showToast({ message: "Login successful!", type: "success" }));
            navigate("/");
        } catch (error) {
            dispatch(showToast({ message: error.message || "Login failed", type: "error" }));
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

        <div className={`login-wrapper ${darkMode ? "dark" : ""}`}>
            <div className="login-form-layer active">
                <h2>Welcome to <span>QubitronX</span></h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="userName" placeholder="Username or Email" value={loginData.userName} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} required />
                    <button className="login-btn" type="submit">Log In</button>
                </form>
                <div className="options">
                    <Link to="/forgot-password">Forgot password?</Link>
                </div>
                <p className="continue-option">or continue with</p>
                <div className="social-login">
                    <button onClick={loginWithGoogle} className="google-btn">
                        <FcGoogle style={{ fontSize: '20px' }} />

                    </button>
                    <button className="facebook">f</button>
                </div>
                <p className="signup-link">
                    New here? <span onClick={() => setView("signup")}>Create an account</span>
                </p>
            </div>
        </div>

    )
}
