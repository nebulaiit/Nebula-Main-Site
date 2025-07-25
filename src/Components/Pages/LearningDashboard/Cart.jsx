import React from 'react'
import "./Cart.css";
import { useDispatch, useSelector } from 'react-redux';



const Cart = () => {

  const dispatch = useDispatch();
  const cartCourses = useSelector((state) => state.cart.items); //
  const darkMode = useSelector((state) => state.darkMode.enabled);


  const handleCheckout = (id) => alert(`Proceed to checkout with course ${id}`);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className={`cart-section  ${darkMode ? 'dark' : ''}`}>
      <h2 className="tab-title">Your Cart</h2>
      <p className="tab-desc">These are the courses you've added to your cart.</p>

      {cartCourses.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-grid">
          {cartCourses.map((course) => (

            <div className="cart-card" key={course.courseId}>
              <img src={course.imageUrl} alt={course.title} className="course-image" />
              <div className="course-info">
                <h3>{course.title}</h3>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Price:</strong> ₹{course.price}</p>
                <div className="course-actions">
                  <button
                    className="btn-checkout"
                    onClick={() => handleCheckout(course.courseId)}
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="btn-remove"
                    onClick={() => handleRemove(course.courseId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;