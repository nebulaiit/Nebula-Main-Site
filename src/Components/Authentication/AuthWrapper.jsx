import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import studentImg from '../Images/Logo/Login.webp';
import './AuthWrapper.css'
import LoginPage from './Login/LoginPage';
import Signup from './SignUp/Signup';
import Verify from './Verify/Verify';


export default function AuthWrapper() {
    const [view, setView] = useState("verify");
    const [tempUserEmail, setTempUserEmail] = useState("");
    const darkMode = useSelector((state) => state.darkMode.enabled);

    return (
        <>
            <div className={`auth-wrapper ${darkMode ? 'dark' : ''}`}>
                <div className="auth-image animated-img">
                    <img src={studentImg} alt="IT Student" />
                </div>
                <div className="form-layer">
                    {view === "login" && <LoginPage setView={setView} />}
                    {view === "signup" && <Signup setView={setView} setTempUserEmail={setTempUserEmail} />}
                    {view === "verify" && <Verify setView={setView} tempUserEmail={tempUserEmail} />}
                </div>
            </div>

        </>


    )
}
