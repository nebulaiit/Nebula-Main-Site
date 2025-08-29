import React, { useEffect, useRef, useState } from 'react';
import './HeroSection.css';
import student from '../../../Images/HomePage/HomepageBg.webp';
import { useSelector } from 'react-redux';
import LazyImage from '../../../LazyImage';

const HeroSection = () => {
  const heroRef = useRef();
  const darkMode = useSelector((state) => state.darkMode.enabled);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = heroRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          node.classList.add('in-view');
          setHasAnimated(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.4 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
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
          <LazyImage src={student} alt="Student Hero" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;