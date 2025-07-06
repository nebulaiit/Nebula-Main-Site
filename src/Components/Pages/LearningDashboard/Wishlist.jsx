import React, { useEffect } from 'react';
import './Wishlist.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlistThunk, removeFromWishlist } from '../../../redux/wishlistSlice';
import { addToCart } from '../../../redux/cartSlice';


const Wishlist = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast(); // ✅ use toast context

  const { items, loading } = useSelector((state) => state.wishlist);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlistThunk(userId));
    }
  }, [dispatch, userId]);

  const handleRemove = (wishlistItemId) => {
    dispatch(removeFromWishlist(wishlistItemId));

  };

  const handleMoveToCart = (course) => {
    dispatch(addToCart(course));

  };

  return (
    <div className="wishlist-wrapper">
      <h2 className="tab-title">Wishlist</h2>
      <p className="tab-desc">Courses you've added to your wishlist.</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="course-list">
          {items.map((item) => (
            <div className="course-card" key={item.id}>
              <img
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
