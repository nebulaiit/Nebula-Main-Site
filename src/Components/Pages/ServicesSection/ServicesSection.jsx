import React, { useEffect, useRef } from 'react';
import './ServicesSection.css';

import branding from "../../Images/branding.svg";
import development from "../../Images/development.svg";
import marketing from "../../Images/marketing.svg";
import app from '../../Images/app.svg';
import { useSelector } from 'react-redux';

const services = [
  {
    icon: branding,
    title: 'Graphic Service',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    link: 'Learn More',
  },
  {
    icon: development,
    title: 'Website Design & Development',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    link: 'Learn More',
  },
  {
    icon: app,
    title: 'Mobile App Development',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    link: 'Learn More',
    highlight: true,
  },
  {
    icon: marketing,
    title: 'Digital Marketing Service',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    link: 'Learn More',
  },
];

export default function ServicesSection() {

  const cardRefs = useRef([]);
  const darkMode = useSelector((state) => state.darkMode.enabled);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } 
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const resetCardTransform = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };



  return (
    <section className={`services-section ${darkMode ? 'dark' : ''}`}>
      <p className="subtitle">SERVICES WE’RE PROVIDED</p>
      <h2 className="title">Our Design & Development Services</h2>

      <div className="services-grid ">
        {services.map((service, index) => (
          <div
            className={`service-card ${service.highlight ? 'highlight' : ''}`}
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            style={{ animationDelay: `${index * 0.2}s` }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => resetCardTransform(index)}
          >
            <img src={service.icon} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <a href="#" className="learn-more-link">
              {service.link} &gt;
            </a>
          </div>
        ))}
      </div>

      <div className="cta-section">
        <p className="mt-3">
          Hire a <span className="bold">Dedicated Developer</span>
        </p>
        <button className="cta-button">Hire Now &gt;</button>
      </div>
    </section>
  );
}
