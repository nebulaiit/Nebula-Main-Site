import React, { useEffect, useRef, useState } from "react";
import "./Benefits.css";
import benefit from "../../../Images/HomePage/Benefit.webp";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import { useSelector } from "react-redux";
import LazyImage from "../../../LazyImage";

const Benefits = () => {
  const darkMode = useSelector((state) => state.darkMode.enabled);

  const benefitsData = [
    {
      icon: <SchoolIcon className="benefit-icon" />,
      title: "Online Degrees",
      description:
        "Earn accredited degrees from a university and develop your career, studying anytime and anywhere.",
    },
    {
      icon: <MenuBookIcon className="benefit-icon" />,
      title: "Short Courses",
      description:
        "A faster way to learn job-relevant skills and receive direct guidance, designed for quick and effective learning.",
    },
    {
      icon: <PeopleIcon className="benefit-icon" />,
      title: "Training From Experts",
      description:
        "Receive practical and advanced guidance from industry experts, gaining groundbreaking real-world knowledge.",
    },
  ];

  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);   // ✅ Trigger animation
          observer.unobserve(entry.target); // ✅ Stop observing after first trigger
        }
      },
      {
        threshold: 0.3,
      }
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);


  return (
    <div
      className={`search-benefits-container ${inView ? "animate-benefits" : ""} ${darkMode ? "dark" : ""}`}
      ref={sectionRef}
    >
      <div className="benefit-content">
        <div className="image-grid">
          <LazyImage src={benefit} alt="Benefits" />
        </div>

        <div className="benefits-container">
          <h2 className="benefits-heading">
            <span className="highlight">Benefits</span> From Our Online Learning
          </h2>
          <div className="benefits-list">
            {benefitsData.map((benefit, index) => (
              <div className="benefit-item " key={index}>
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