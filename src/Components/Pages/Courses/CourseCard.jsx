import React from 'react';
import './courseList.css';

export default function CourseCard({ course }) {
    return (
        <div className="course-card">
            <img src={course.thumbnailUrl} alt={course.title} className="course-img" />
            <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.instructor}</p>
                <span className="price-tag">₹{course.price}</span>
            </div>
        </div>
    );
}
