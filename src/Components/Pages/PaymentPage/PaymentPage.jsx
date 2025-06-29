// src/Components/PaymentPage.jsx
import React, { useState } from "react";
import "./PaymentPage.css";
import { useNavigate, useLocation } from "react-router-dom";

const countries = [
    { name: "India", states: ["Maharashtra", "Delhi", "Uttar Pradesh"] },
    { name: "United States", states: ["California", "New York", "Texas"] },
    { name: "United Kingdom", states: ["England", "Scotland", "Wales"] },
];

const PaymentPage = () => {
    const location = useLocation();
    const course = location.state?.course;

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [country, setCountry] = useState("India");
    const [state, setState] = useState("");
    const [coupon, setCoupon] = useState("");
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const navigate = useNavigate();

    // Agar course data nahi hai to user ko message dikhayein
    if (!course) {
        return <p>No course selected. Please go back and select a course.</p>;
    }

    const selectedCountry = countries.find((c) => c.name === country);

    // Base total calculation from course price and discount
    const baseTotal = course.price - (course.discount || 0);

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

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

 const handlePayment = async () => {
    if (!agreed) return alert("Please accept terms and conditions.");
    setLoading(true);

    try {
        // Step 1: Create Razorpay order via backend
        const res = await fetch('http://localhost:8080/api/payments/create-order?amount=1000&currency=INR', {
            method: 'POST'
        });
        const order = await res.json();

        // Step 2: Razorpay options
        const options = {
            key: "rzp_test_E1VHn4r8R09Rak", // Replace with your Razorpay key
            amount: order.amount,
            currency: order.currency,
            name: "Your Company",
            description: "Course Purchase",
            order_id: order.id,
            handler: function (response) {
                setLoading(false);
                alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);

                // Step 3: Save course to localStorage
                const existingCourses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
                const updatedCourses = [...existingCourses, course];
                localStorage.setItem("purchasedCourses", JSON.stringify(updatedCourses));

                // Step 4: Ask to continue
                const next = window.confirm("Do you want to start your course now?");
                if (next) {
                    navigate("/thankyou", { state: { course: course } });
                }
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

    } catch (err) {
        setLoading(false);
        console.error("Payment initiation failed:", err);
        alert("❌ Payment failed. Please try again.");
    }
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
                                {selectedCountry?.states.map((s) => (
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
                        <img src={course.image} alt="Course" />
                        <div>
                            <p>{course.title}</p>
                            <p className="price">
                                ₹{total.toFixed(0)}{" "}
                                <span className="strike">₹{course.price}</span>
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
                    <span>₹{course.price}</span>
                </div>
                <div className="summary-line">
                    <span>Discounts:</span>
                    <span>-₹{course.discount || 0}</span>
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

                <button className="pay-btn" onClick={handlePayment} disabled={loading}>
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
