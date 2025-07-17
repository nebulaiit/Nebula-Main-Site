import React, { useEffect, useRef, useState } from 'react';
import './HeroSection.css';
import student from '../../Images/HomePage/HomepageBg.png';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const heroRef = useRef();
  const darkMode = useSelector((state) => state.darkMode.enabled);
  const [hasAnimated, setHasAnimated] = useState(false); // ✅ new state

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          heroRef.current.classList.add('in-view');
          setHasAnimated(true); // ✅ lock it in
          observer.unobserve(heroRef.current);
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
  }, [hasAnimated]);

  return (
    <section
      ref={heroRef}
      className={`hero ${darkMode ? 'dark' : ''} ${hasAnimated ? 'in-view' : ''}`}
    >
      <div className="hero-text">
        <h1>Develop your skills in a new and unique way</h1>
        <p>
          Explore a transformative approach to skill development on our online
          learning platform.
        </p>
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
