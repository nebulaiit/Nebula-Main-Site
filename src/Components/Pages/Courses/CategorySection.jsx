import React from 'react';
import CourseCard from './CourseCard';
import { useSelector } from 'react-redux';

export default function CategorySection({ title, courses }) {
    const darkMode = useSelector((state) => state.darkMode.enabled);    

    return ( 
        <section className={`category-section ${darkMode ? 'dark' : ''}`}>
            <h2 className="category-title">{title}</h2>
            <div className="course-grid">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </section>
    );
}
