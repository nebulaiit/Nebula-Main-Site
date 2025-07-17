import React from 'react';
import './courseList.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course }) {
    const darkMode = useSelector((state) => state.darkMode.enabled);    
    const navigate = useNavigate();

    
    return (
        <div className={`course-card ${darkMode ? 'dark' : ''}`} onClick={() => navigate(`/learning-path/${course.id}`)}>
            <img src={course.thumbnailUrl} alt={course.title} className="course-img" />
            <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.instructor}</p>
                <span className="price-tag">₹{course.price}</span>
            </div>
        </div>
    );
}
