import React, { useEffect } from 'react';
import './Wishlist.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlistThunk, removeFromWishlist } from '../../../redux/wishlistSlice';
import { showToast } from '../../../redux/toastSlice';
import { addToCart } from '../../../redux/cartSlice';
import LazyImage from '../../LazyImage';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);
  const userId = useSelector((state) => state.auth.userId);
  const darkMode = useSelector((state) => state.darkMode.enabled);

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistThunk(userId));
    }
  }, [dispatch, userId]);

  const handleRemove = (wishlistItemId) => {
    dispatch(removeFromWishlist(wishlistItemId));
    showToast('Removed from wishlist', 'error');
  };

  const handleMoveToCart = (course) => {
    dispatch(addToCart(course));
    dispatch(removeFromWishlist(course.id));
    showToast('Moved to cart!', 'success');
  };

  return (
    <div className={`wishlist-wrapper ${darkMode ? 'dark' : ''}`}>
      <h2 className="tab-title">Wishlist</h2>
      <p className="tab-desc">Courses you've added to your wishlist.</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="course-list">
          {items.map((item) => (
            <div className="course-card" key={item.id}>
              <LazyImage
                src={item.imageUrl}
                alt={item.title}
                className="course-image"
              />
              <div className="course-info-wishlist">
                <h3>{item.title}</h3>
                <p><strong>Instructor:</strong> {item.instructor}</p>
                <p><strong>Duration:</strong> {item.duration}</p>
                <p><strong>Level:</strong> {item.level}</p>
                <div className="course-actions">
                  <button
                    className="btn-remove"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                  <button className="btn-move" onClick={() => handleMoveToCart(item)}>
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