import React, { useState } from "react";
import { signUpUser } from "../../APIService/apiservice";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../redux/toastSlice";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

const Signup = ({ setView, setTempUserEmail }) => {
    const darkMode = useSelector((state) => state.darkMode.enabled);

    const [signUpData, setSignUpData] = useState({
        firstName: "", lastName: "", email: "", password: "", phoneNumber: ""
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signUpUser(signUpData);
            if (response.status === 201) {
                setTempUserEmail(signUpData.email);
                dispatch(showToast({
                    message: "Signup successful! Check your email for verification code.",
                    type: "info"
                }));
                setView("verify");
            }
        } catch (error) {
            dispatch(showToast({
                message: error.response?.data?.message || "Signup failed",
                type: "error"
            }));
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
        onError: () => dispatch(showToast({ message: "Google signup failed", type: "error" }))
    });

    return (

        <div className={`login-wrapper ${darkMode ? "dark" : ""}`}>
            <div className="login-form-layer active">
                <h2>Join <span>QubitronX</span></h2>
                <form onSubmit={handleSubmit}>
                    <div className="d-flex" style={{ gap: "10px" }}>
                        <input type="text" name="firstName" placeholder="First Name" value={signUpData.firstName} onChange={handleChange} required />
                        <input type="text" name="lastName" placeholder="Last Name" value={signUpData.lastName} onChange={handleChange} required />
                    </div>
                    <input type="email" name="email" placeholder="Email" value={signUpData.email} onChange={handleChange} required />
                    <div className="d-flex" style={{ gap: "10px" }}>
                        <input type="text" name="phoneNumber" placeholder="Phone Number" value={signUpData.phoneNumber} onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" value={signUpData.password} onChange={handleChange} required />
                    </div>
                    <button className="login-btn" type="submit">Sign Up</button>
                    <p className="continue-option">or continue with</p>
                    <div className="social-login">
                        <button onClick={loginWithGoogle} className="google-btn">
                            <FcGoogle style={{ fontSize: "20px" }} />
                        </button>
                        <button className="facebook">f</button>
                    </div>
                </form>
                <p className="signup-link">
                    Already have an account? <span onClick={() => setView("login")}>Log in</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
