import React from 'react';
import CourseCard from './CourseCard';

export default function CategorySection({ title, courses }) {
    return (
        <section className="category-section">
            <h2 className="category-title">{title}</h2>
            <div className="course-grid">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </section>
    );
}
