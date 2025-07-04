import React, { useEffect } from 'react'
import "./Wishlist.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlistThunk, removeFromWishlist } from '../../../redux/wishlistSlice';
import { addToCart } from '../../../redux/cartSlice';


const Wishlist = () => {

  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);
  const userId = useSelector((state) => state.auth.userId); // ✅ FIXED

  useEffect(() => {
    dispatch(fetchWishlistThunk(userId));
  }, [dispatch, userId]);

  const handleRemove = (courseId) => {
    dispatch(removeFromWishlist({ userId, courseId }));
  };


  const handleMoveToCart = (course) => {
    dispatch(addToCart(course)); // full course object

  };

  return (
    <div className="wishlist-wrapper">
      <h2 className="tab-title">Wishlist</h2>
      <p className="tab-desc">Courses you've added to your wishlist.</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="course-list">
          {items.map((course) => (
            <div className="course-card" key={course.courseId}>
              <img
                src={course.imageUrl}
                alt={course.title}
                className="course-image"
              />
              <div className="course-info-wishlist">
                <h3>{course.title}</h3>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Level:</strong> {course.level}</p>
                <div className="course-actions">
                  <button className="btn-remove" onClick={() => handleRemove(course.courseId)}>
                    Remove
                  </button>
                  <button className="btn-move" onClick={() => handleMoveToCart(course)}>
                    Move to Cart
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

export default Wishlist;
