// src/Components/PaymentPage.jsx
import React, { useState } from "react";
import "./PaymentPage.css";
import { useNavigate } from "react-router-dom";

const countries = [
    { name: "India", states: ["Maharashtra", "Delhi", "Uttar Pradesh"] },
    { name: "United States", states: ["California", "New York", "Texas"] },
    { name: "United Kingdom", states: ["England", "Scotland", "Wales"] },
];

const courseData = {
    title: "Java Tutorial for Complete Beginners",
    price: 799,
    discount: 400,
    image: "https://img-c.udemycdn.com/course/240x135/851712_fc61_6.jpg",
};

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [country, setCountry] = useState("India");
    const [state, setState] = useState("");
    const [coupon, setCoupon] = useState("");
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const navigate = useNavigate();
    const selectedCountry = countries.find((c) => c.name === country);

    const baseTotal = courseData.price - courseData.discount;
    const couponCode = coupon.trim().toUpperCase();
    let discountAmount = 0;
    let couponMessage = "";

    if (couponCode === "SAVE10") {
        discountAmount = baseTotal * 0.1;
        couponMessage = `🎉 Coupon applied! You saved ₹${discountAmount.toFixed(0)}.`;
    } else if (couponCode === "GET20OFF") {
        discountAmount = baseTotal * 0.2;
        couponMessage = `🎉 Coupon applied! You saved ₹${discountAmount.toFixed(0)}.`;
    } else if (couponCode === "SAVE50") {
        discountAmount = 50;
        couponMessage = `🎉 Coupon applied! You saved ₹50.`;
    } else if (coupon) {
        couponMessage = "❌ Invalid coupon";
    }

    const total = baseTotal - discountAmount;

    const handlePay = () => {
        if (!agreed) return alert("Please accept terms and conditions.");
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("✅ Payment Successful 🎉");

            const next = window.confirm("Do you want to start your course now?");
            if (next) {
                navigate("/thankyou");
            }
        }, 2000);
    };

    return (
        <div className="checkout-container">
            {/* Left Side */}
            <div className="checkout-left">
                <h2>Checkout</h2>

                {/* Billing Address */}
                <div className="section">
                    <h3>Billing Address</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Country</label>
                            <select value={country} onChange={(e) => setCountry(e.target.value)}>
                                {countries.map((c) => (
                                    <option key={c.name}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>State / Province</label>
                            <select value={state} onChange={(e) => setState(e.target.value)}>
                                <option value="">Select State</option>
                                {selectedCountry.states.map((s) => (
                                    <option key={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="section">
                    <h3>Payment Method</h3>
                    <div className="payment-methods">
                        {[
                            { value: "card", label: "Cards", icon: "💳" },
                            { value: "upi", label: "UPI", icon: "🔷" },
                            { value: "netbanking", label: "Net Banking", icon: "🏦" },
                            { value: "wallet", label: "Mobile Wallets", icon: "💼" },
                        ].map((method) => (
                            <div
                                className={`payment-option-box ${paymentMethod === method.value ? "selected" : ""
                                    }`}
                                key={method.value}
                            >
                                <label className="payment-option-label">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value={method.value}
                                        checked={paymentMethod === method.value}
                                        onChange={() => setPaymentMethod(method.value)}
                                    />
                                    <span className="payment-icon">{method.icon}</span>
                                    {method.label}
                                </label>

                                {paymentMethod === method.value && (
                                    <div className="payment-details">
                                        {method.value === "card" && (
                                            <>
                                                <input type="text" placeholder="Card Number" />
                                                <div className="card-row">
                                                    <input type="text" placeholder="MM/YY" />
                                                    <input type="text" placeholder="CVV" />
                                                </div>
                                                <input type="text" placeholder="Name on Card" />
                                                <label className="save-card">
                                                    <input type="checkbox" /> Save this card
                                                </label>
                                            </>
                                        )}
                                        {method.value === "upi" && (
                                            <input type="text" placeholder="Enter your UPI ID" />
                                        )}
                                        {method.value === "netbanking" && (
                                            <select>
                                                <option>Select Bank</option>
                                                <option>HDFC</option>
                                                <option>ICICI</option>
                                                <option>SBI</option>
                                                <option>Axis Bank</option>
                                            </select>
                                        )}
                                        {method.value === "wallet" && (
                                            <select>
                                                <option>Select Wallet</option>
                                                <option>Paytm</option>
                                                <option>PhonePe</option>
                                                <option>Amazon Pay</option>
                                            </select>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Info */}
                <div className="section">
                    <h3>Order Details (1 Course)</h3>
                    <div className="course-summary">
                        <img src={courseData.image} alt="Course" />
                        <div>
                            <p>{courseData.title}</p>
                            <p className="price">
                                ₹{total.toFixed(0)}{" "}
                                <span className="strike">₹{courseData.price}</span>
                            </p>
                        </div>
                    </div>

                    {/* Coupon Input */}
                    <input
                        className="coupon"
                        type="text"
                        placeholder="Have a coupon code?"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                    {coupon && <p className="coupon-msg">{couponMessage}</p>}

                </div>
            </div>

            {/* Right Side */}
            <div className="checkout-right">
                <h3>Order Summary</h3>
                <div className="summary-line">
                    <span>Original Price:</span>
                    <span>₹{courseData.price}</span>
                </div>
                <div className="summary-line">
                    <span>Discounts:</span>
                    <span>-₹{courseData.discount}</span>
                </div>
                {discountAmount > 0 && (
                    <div className="summary-line">
                        <span>Coupon ({couponCode}):</span>
                        <span>-₹{discountAmount.toFixed(0)}</span>
                    </div>
                )}

                <hr />
                <div className="summary-line total">
                    <span>Total:</span>
                    <span>₹{total.toFixed(0)}</span>
                </div>

                <label className="terms">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={() => setAgreed(!agreed)}
                    />{" "}
                    I agree to the Terms & Conditions.
                </label>

                <button className="pay-btn" onClick={handlePay} disabled={loading}>
                    {loading ? "Processing..." : `🔒 Pay ₹${total.toFixed(0)}`}
                </button>

                <p className="note">
                    30-Day Money-Back Guarantee. Full refund if you're not satisfied.
                </p>

                <div className="success-box">
                    <b>🔥 Tap into Success Now</b>
                    <p>10+ users enrolled in the last 24 hours.</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
