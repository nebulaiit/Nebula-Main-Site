import React, { useEffect, useRef } from 'react';
import './WhyNebula.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faStar, faCode } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const cardData = [
  {
    icon: faCheckCircle,
    title: 'For programmers, by programmers',
    text: "We're not just teachers—we're active programmers creating resources we wish we had when learning to code."
  },
  {
    icon: faStar,
    title: "Coding isn't easy",
    text: "We believe in honest, practical learning. Expect to work hard, write lots of code, and build genuine programming skills that employers value."
  },
  {
    icon: faCode,
    title: 'Learn by doing',
    text: "Theory alone isn't enough. Every concept has complete code examples you can run, modify, and use in your projects."
  }
];

const WhyNebula = () => {
  const cardRefs = useRef([]);
  const titleRef = useRef(null);
  const darkMode = useSelector((state) => state.darkMode.enabled);


useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // ✅ Stop observing after first view
        }
      });
    },
    { threshold: 0.2 }
  );

  cardRefs.current.forEach((ref) => ref && observer.observe(ref));
  if (titleRef.current) observer.observe(titleRef.current);

  return () => {
    cardRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    if (titleRef.current) observer.unobserve(titleRef.current);
  };
}, []);


  return (
    <div className={`why-nebula ${darkMode ? 'dark' : ''}`}>
      <h2 className="why-nebula-title" ref={titleRef}>Why Qubitron<span className='title-x'>X</span> ?</h2>
      <div className="why-nebula-cards">
        {cardData.map((card, index) => (
          <div
            className="why-nebula-card"
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div className="why-nebula-icon">
              <FontAwesomeIcon icon={card.icon} />
            </div>
            <h4 className="why-nebula-card-title">{card.title}</h4>
            <p className="why-nebula-card-text">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyNebula;
