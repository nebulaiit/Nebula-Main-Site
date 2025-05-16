import React from 'react';
import './ServicesSection.css';

import branding from "../../Images/branding.svg";
import development from "../../Images/development.svg";
import marketing from "../../Images/marketing.svg";
import app from '../../Images/app.svg';

const services = [
  {
    icon: branding,
    title: 'Branding Service',
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
  return (
    <section className="services-section">
      <p className="subtitle">SERVICES WE’RE PROVIDED</p>
      <h2 className="title">Our Design & Development Services</h2>

      <div className="services-grid">
        {services.map((service, index) => (
          <div
            className={`service-card ${service.highlight ? 'highlight' : ''}`}
            key={index}
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
        <p className='mt-3'>
          Hire a <span className="bold">Dedicated Developer</span>
        </p>
        <button className="cta-button">Hire Now &gt;</button>
      </div>
    </section>
  );
}

