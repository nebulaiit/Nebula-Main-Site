import React, { useEffect, useState } from 'react';
import './Premium.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCourse } from '../../APIService/apiservice';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../../../redux/wishlistSlice';
import { addToCart } from '../../../redux/cartSlice';



const Premium = () => {
  const [courses, setCourses] = useState([]);
  const { courseName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const userId = useSelector((state) => state.auth.userId); // assumes you store userId in auth slice

  useEffect(() => {
    const fetchCourseList = async () => {
      try {
        const response = await getAllCourse(courseName);
        console.log("Fetched courses:", response);
        setCourses(response);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchCourseList();
  }, [courseName]);

  const handleAddToWishlist = (course) => {
    const item = {
      courseId: course.id,
      title: course.courseTitle,
      instructor: course.instructor || "Unknown",
      duration: `${course.duration} ${course.durationUnit}`,
      level: course.level || "All levels",
      imageUrl: course.image,
    };
    dispatch(addToWishlist({ userId, item }));
     
  };

  const handleMoveToCart = (course) => {
  dispatch(addToCart(course)); // full course object


};

  return (
    <div className="course-list-container">
      <h2>Premium Courses</h2>
      <div className="card-row">
        {courses.map((course) => (
          <div className="course-card" key={course.id} onClick={() => navigate(`/learning-path/${course.id}`)}>
            <img src={course.image} alt={course.courseTitle} className="course-image" />
            <div className="course-details">
              <h3 className='course-title'>{course.courseTitle}</h3>
              <div className="duration">
                <span>
                  Duration : {course.duration} {course.durationUnit}
                </span>
              </div>
              <div className="price-section">
                <span className="price">₹{course.effectivePrice}</span>
                <span className="original-price">₹{course.price}</span>
              </div>
              <div className="card-actions">
                <button className="add-to-cart" 
                 onClick={(e)=>{
                  e.stopPropagation();
                  handleMoveToCart(course)
                 }}
                >Add to cart</button>
                <button
                  className="wishlist-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click
                    handleAddToWishlist(course);
                  }}
                >
                  ♡
                </button>
              </div>
              {course.bestseller && <span className="bestseller-badge">Bestseller</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
