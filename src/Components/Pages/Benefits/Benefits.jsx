import React, { useEffect, useRef, useState } from 'react';
import './Benefits.css';
import std1 from '../../Images/HomePage/std1.jpeg';
import std2 from '../../Images/HomePage/std2.jpeg';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
    

const Benefits = () => {
    const img = [std1, std2, std1, std2];

    const benefitsData = [
        {
            icon: <SchoolIcon className="benefit-icon" />,
            title: 'Online Degrees',
            description:
                'Earn accredited degrees from a university and develop your career, studying anytime and anywhere.',
        },
        {
            icon: <MenuBookIcon className="benefit-icon" />,
            title: 'Short Courses',
            description:
                'A faster way to learn job-relevant skills and receive direct guidance, designed for quick and effective learning.',
        },
        {
            icon: <PeopleIcon className="benefit-icon" />,
            title: 'Training From Experts',
            description:
                'Receive practical and advanced guidance from industry experts, gaining groundbreaking real-world knowledge.',
        }
    ];

    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            {
                threshold: 0.3,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <div
            className={`search-benefits-container ${inView ? 'animate-benefits' : ''}`}
            ref={sectionRef}
        >
            <div className="benefit-content">
                <div className="image-grid">
                    <div className="grid-wrapper">
                        {img.map((i, index) => (
                            <div key={index} className={`grid-box box-${index + 1}`}>
                                <img src={i} alt={`User ${index}`} className="animated-image" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="benefits-container">
                    <h2 className="benefits-heading">
                        <span className="highlight">Benefits</span> From Our Online Learning
                    </h2>
                    <div className="benefits-list">
                        {benefitsData.map((benefit, index) => (
                            <div className="benefit-item" key={index}>
                                <div className="icon-wrapper">
                                    <div className="benefit-icon">{benefit.icon}</div>
                                </div>
                                <div className="benefit-desc">
                                    <h3>{benefit.title}</h3>
                                    <p>{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Benefits;
