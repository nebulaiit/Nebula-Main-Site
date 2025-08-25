import React, { useState } from "react";
import { verifyUserCode } from "../../APIService/apiservice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Verify = ({ setView, tempUserEmail }) => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const darkMode = useSelector((state) => state.darkMode.enabled);


    const handleChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);
    };

    const handlePaste = (event) => {
        const pastedData = event.clipboardData.getData("text");
        if (/^\d{6}$/.test(pastedData)) {
            setCode(pastedData.split(""));
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const otp = code.join("");
        try {
            const response = await verifyUserCode({ userName: tempUserEmail, code: otp });
            if (response?.code === 200) {
                setMessage("✅ Verification Successful!");
                navigate("/employeedashboard");
            } else {
                setMessage("❌ Incorrect OTP. Try again.");
            }
        } catch {
            setMessage("❌ Verification failed. Try again.");
        }
    };

    return (
        <div className={`login-wrapper ${darkMode ? "dark" : ""}`}>
            <div className="login-form-layer active">
                <h2>Verify Your Email</h2>
                <p className="mt-3">We sent a verification code to: <strong>{tempUserEmail}</strong></p>
                <form onSubmit={handleVerify} className="verify-form">
                    <div className="code-inputs">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onPaste={handlePaste}
                            />
                        ))}
                    </div>
                    <button className="login-btn" type="submit">Verify</button>
                </form>
                <p>{message}</p>
                <p className="resend-text">
                    Experiencing issues? <span>Resend Code</span>
                </p>
                <p className="signup-link">
                    Already verified? <span onClick={() => setView("login")}>Login now</span>
                </p>
            </div>
        </div>

    );
};

export default Verify;
