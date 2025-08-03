import React, { useEffect, useState } from "react";
import "./Enrollment.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profile from "../Components/Images/profile-icon.jpg";
import { showToast } from "../redux/toastSlice";
import { getCourseDetails } from "../Components/APIService/apiservice";

const Enrollment = () => {

  const darkMode = useSelector((state) => state.darkMode.enabled);
  const dispatch = useDispatch();
  const { id } = useParams();

  const whatYouLearn = [
    {
      id: 1,
      title: "JavaScript, React, & Node.js",
      description: "Build fully-fledged websites and web apps.",
    },
    {
      id: 2,
      title: "JavaScript Interviews",
      description: "Prepare for JavaScript Interviews.",
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      description: "Prepare for the data structures and algorithm interviews.",
    },
  ];

  const skillHighlights = [
    { title: "Web Development", learners: "14M" },
    { title: "JavaScript", learners: "18M" },
    { title: "HTML", learners: "12M" },
    { title: "CSS", learners: "9.9M" },
    { title: "Node.Js", learners: "3.4M" },
  ];
  const testimonials = [
    {
      id: 1,
      text: `Taking this course was a great decision for me, as it boosted my confidence into finally doing something and feeling capable of being a solid web developer`,
      user: "Diego José V.",
      subtext: "Review from The Ultimate 2025 Fullstack Web Development Bootcamp",
      image: profile,
      link: "#",
    },
    {
      id: 2,
      text: `Udemy was truly a game-changer and a great guide for me as we brought Dimensional to life.`,
      user: "Alvin Lim",
      subtext: "Technical Co-Founder, CTO at Dimensional",
      image: profile,
    },
    {
      id: 3,
      text: `Udemy was rated the most popular online course or certification program for learning how to code according to StackOverflow's 2023 Developer survey.`,
      user: "StackOverflow",
      subtext: "37,076 responses collected",
      image: profile,
      link: "#",
    },
  ];

  const handleClick = () => {
    dispatch(showToast({ message: 'Course Added to Cart', type: 'info' }));
  }

  useEffect(() => {

    const fetchCourseDetails = async () => {
      try {
        const response = await getCourseDetails(id);

        console.log(response);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchCourseDetails();
  }, []);


  return (
    <div className={`enrollment-page  ${darkMode ? 'dark' : ''}`}>
      <div className="course-card-wrapper">
        <div className="course-content">
          <h1 className="course-title">Full Stack Web Developer<br />Career Accelerator</h1>
          <p className="course-description">
            Your career in full stack web development starts here. Fast-track learning and interview prep. Grow skills at your own pace. Expand your earnings potential.
          </p>

          <div className="course-stats">
            <div className="stat-item">
              <span className="value"><span className="star">★</span>4.7</span>
              <span className="label">average course rating</span>
            </div>
            <div className="stat-item">
              <span className="value">126</span>
              <span className="label">practice exercises</span>
            </div>
            <div className="stat-item">
              <span className="value">87.6</span>
              <span className="label">hours of content</span>
            </div>
          </div>

          <button className="subscribe-btn" onClick={handleClick}>Start Your Journey</button>
          <p className="enrolled">👥 <strong>1.5M</strong> learners already enrolled</p>
        </div>

        <div className="course-image">
          <img src='' alt="Instructor" />
        </div>
      </div>

      <div className="learning-section">
        <h2 className="learning-section-title">What you'll learn</h2>
        <div className="learning-cards">
          {whatYouLearn.map((item) => (
            <div key={item.id} className="learning-card">
              <h3 className="learning-title">{item.title}</h3>
              <p className="learning-desc">{item.description}</p>
              <span className="card-number">{item.id}</span>
            </div>
          ))}
        </div>

        <h2 className="learning-section-title">Learn the skills that matter most</h2>
        <div className="skills-grid">
          {skillHighlights.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon">💻</div>
              <div>
                <strong>{skill.title}</strong><br />
                {skill.learners} learners
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="testimonial-section">
        <h2 className="testimonial-heading">What other learners are saying</h2>
        <div className="testimonial-cards">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="quote-mark">“</div>
              <p className="testimonial-text">
                {item.text}

              </p>
              <div className="testimonial-user">
                <img src={item.image} alt={item.user} className="user-img" />
                <div>
                  <strong>{item.user}</strong>
                  <p className="subtext">{item.subtext}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default Enrollment;
