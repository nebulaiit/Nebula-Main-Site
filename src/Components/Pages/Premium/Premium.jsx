import React, { useEffect, useState } from 'react';
import './Premium.css';
import course1 from "../../Images/course1.jpg";
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCourse } from '../../APIService/apiservice';

const Premium = () => {

  const [courses, setCourses] = useState([]);

  const { courseName } = useParams();


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
  }, [])

  const navigator = useNavigate();
  return (
    <div className="course-list-container">
      <h2>Premium Courses</h2>
      <div className="card-row">
        {courses.map((course, index) => (
          <div className="course-card" key={index} onClick={() => navigator(`/learning-path/${course.id}`)}>
            <img src={course.image} alt={course.courseTitle} className="course-image" />
            <div className="course-details">
              <h3 className='course-title'>{course.courseTitle}</h3>
              {/* <p className="instructor">{course.instructor}</p> */}
              {/* <p className="rating">
                <strong>{course.rating} ⭐</strong> ({course.reviews.toLocaleString()})
              </p> */}

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
                <button className="add-to-cart">Add to cart</button>
                <button className="wishlist-btn">♡</button>
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
