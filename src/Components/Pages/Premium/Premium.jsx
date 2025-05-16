import React from 'react';
import './Premium.css'; 
import course1 from "../../Images/course1.jpg"

const courses = [
  {
    image: course1,
    title: 'Java Tutorial for Complete Beginners',
    instructor: 'John Purcell',
    rating: 4.5,
    reviews: 101915,
    price: 519,
    originalPrice: 799,
    premium: true,
    bestseller: false,
  },
  {
    image: 'python-laptop.png',
    title: 'The Complete Python Bootcamp From Zero to Hero in Python',
    instructor: 'Jose Portilla, Pierian Training',
    rating: 4.6,
    reviews: 534994,
    price: 519,
    originalPrice: 3109,
    premium: true,
    bestseller: false,
  },
  {
    image: 'angela-python.png',
    title: '100 Days of Code: The Complete Python Pro Bootcamp',
    instructor: 'Dr. Angela Yu, Developer and Lead Instructor',
    rating: 4.7,
    reviews: 365886,
    price: 549,
    originalPrice: 3279,
    premium: true,
    bestseller: true,
  },
  {
    image: 'angela-fullstack.png',
    title: 'The Complete Full-Stack Web Development Bootcamp',
    instructor: 'Dr. Angela Yu, Developer and Lead Instructor',
    rating: 4.7,
    reviews: 434818,
    price: 519,
    originalPrice: 3109,
    premium: true,
    bestseller: true,
  },
];

const Premium = () => {
  return (
    <div className="premium-container">
      <div className="card-row">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <img  src={course.image}  alt={course.title}  className="course-image"
            />
            <div className="course-details">
                <h3>{course.title}</h3>
                <p>{course.instructor}</p>
                <p>
                    <strong>{course.rating} ⭐</strong> ({course.reviews.toLocaleString()})
                </p>
                <p>
                    <span className="price">₹{course.price}</span>{' '}
                    <span className="original-price">₹{course.originalPrice}</span>
                </p>
                <div className="card-actions">
                    <button className="add-to-cart">Add to cart</button>
                    <button className="wishlist-btn">♡</button>
                </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;