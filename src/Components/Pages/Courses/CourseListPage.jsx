import React from 'react'
import CategorySection from './CategorySection';
import './courseList.css';
import { useSelector } from 'react-redux';


export default function CourseListPage() {
    const darkMode = useSelector((state) => state.darkMode.enabled);

    const courses = [
        {
            id: '1',
            title: 'Java Spring Boot Masterclass',
            category: 'Full Stack Java Development',
            instructor: 'Shubham M.',
            price: 799,
            thumbnailUrl: 'https://via.placeholder.com/300x140'
        },
        {
            id: '2',
            title: 'Java Spring Boot Masterclass',
            category: 'Full Stack Java Development',
            instructor: 'Shubham M.',
            price: 799,
            thumbnailUrl: 'https://via.placeholder.com/300x140'
        },
        {
            id: '3',
            title: 'Java Spring Boot Masterclass',
            category: 'Full Stack Java Development',
            instructor: 'Shubham M.',
            price: 799,
            thumbnailUrl: 'https://via.placeholder.com/300x140'
        },
  
        {
            id: '4',
            title: 'React & Tailwind Web App',
            category: 'Web Development',
            instructor: 'Shubham M.',
            price: 599,
            thumbnailUrl: 'https://via.placeholder.com/300x140'
        },
        // ... more
    ];

    const grouped = {
        'Full Stack Java Development': [],
        'Web Development': [],
        'Data Analytics': [],
        'Data Science': [],
    };

    courses.forEach((course) => {
        if (grouped[course.category]) {
            grouped[course.category].push(course);
        }
    });
    
    return (
        <>
            <div className={`course-list-wrapper ${darkMode ? 'dark' : ''}`}>
                {Object.entries(grouped).map(([category, list]) => (
                    list.length > 0 && <CategorySection key={category} title={category} courses={list} />
                ))}
            </div>


        </>
    )
}
