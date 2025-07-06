import React, { useEffect, useRef } from 'react';
import './HeroSection.css';
import student from '../../Images/HomePage/hero-student.png'

const HeroSection = () => {
  const heroRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heroRef.current.classList.add('in-view');
        }
      },
      { threshold: 0.4 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="hero " ref={heroRef}>
      <div className="hero-text">
        <h1>Develop your skills in a new and unique way</h1>
        <p>Explore a transformative approach to skill development on our online learning platform.</p>
        <button className="enroll-btn">Enroll Now</button>
      </div>
      <div className="hero-image">
        <div className="tilt-wrapper">
          <img src={student} alt="Student Hero" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
