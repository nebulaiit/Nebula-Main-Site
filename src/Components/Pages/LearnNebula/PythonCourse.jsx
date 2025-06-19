import React, { useEffect, useState } from 'react';
import './PythonCourse.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LanguageHeader from '../NewPage/LanguageHeader';
import { getHeadingList } from '../../APIService/apiservice';




const PythonCourse = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const [headings, setHeadings] = useState([])

  const handleCardClick = (index) => {
    // If same card is clicked again, close it
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleEnrollmentClick = () => {
    navigate("/try-now");
  };

  useEffect(() => {

    const fetchHeadingList = async () => {
      try {

        const response = await getHeadingList(courseName);
        // console.log(response);
        setHeadings(response);

      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchHeadingList();
  }, [])

  return (
    <>
      <div className='course-container-wraper'>
        <LanguageHeader />
        <div className="container-page m-5">
          <div className="p-4 d-flex justify-content-between bg-light rounded-3">
            <div>
              <div className="d-flex justify-content-center justify-content-lg-start align-items-center mb-2">
                <h5 className="mb-0 text-primary fw-bold">Nebula </h5>
                <span className="badge text-primary ms-2">PRO</span>
              </div>
              <small className="text-danger fw-semibold d-block">Recommended Course:</small>
              <h2 className="fw-bold my-2">Master {courseName} Programming</h2>
              <p className="mb-1 text-muted">Perfect for beginners serious about building a career in {courseName}.</p>
              <p className="mb-4 text-muted">Created by the Programiz team with over a decade of experience.</p>

              <button className="btn btn-primary px-4" onClick={handleEnrollmentClick}>
                Try Now <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>

            <div className="mt-4 mt-lg-0 text-start">
              <ul className="list-unstyled ms-lg-4">
                <li className="mb-3"><i className="fas fa-user-graduate me-2"></i><strong>Enrollment:</strong> 317k</li>
                <li className="mb-3"><i className="fas fa-laptop-code me-2"></i><strong>Practice Problems:</strong> 239+</li>
                <li className="mb-3"><i className="fas fa-project-diagram me-2"></i><strong>Projects:</strong> 5+</li>
                <li><i className="fas fa-certificate me-2"></i><strong>Certifications</strong></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <h1>Learn {courseName} Programming</h1>
          <p>{courseName} is one of the top programming languages in the world, widely used in fields such as AI, machine learning, data science, and web development.</p>
          <p>The simple and English-like syntax of {courseName} makes it a go-to language for beginners who want to get into coding quickly.</p>
          <p>Because {courseName} is used in multiple fields, there is a high demand for {courseName} developers, with competitive base salaries.</p>
          <p className="guide-intro">In this guide, we will cover:</p>
          <ul className="link-list">
            <li><a href="#">Beginner's Guide to {courseName}</a></li>
            <li><a href="#">Is {courseName} for you?</a></li>
            <li><a href="#">Best Way to Learn {courseName}</a></li>
            <li><a href="#">How to Run {courseName}?</a></li>
          </ul>
          <p className="final-note">If you are simply looking to learn {courseName} step-by-step, you can follow our free tutorials in the next section.</p>
        </div>
        <div className="container my-5">
          <h2 className="fw-bold text-center mb-3">Beginner's Guide to {courseName}</h2>
          <p className="text-center">These tutorials will provide you with a solid foundation in {courseName} and prepare you for your career goals.</p>
        </div>
        <div className="container my-5 pink-feature-container">
          {headings
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map((heading) => (
              <div key={heading.id} className="modern-dropdown-card mb-4">
                <div
                  className={`dropdown-header ${activeIndex === heading.id ? "active" : ""}`}
                  onClick={() => handleCardClick(heading.id)}
                >
                  <h5 className="mb-0">{heading.headingName}</h5>
                  <i className={`fas fa-chevron-${activeIndex === heading.id ? "up" : "down"}`}></i>
                </div>
                <div className={`dropdown-body ${activeIndex === heading.id ? "open" : ""}`}>
                  {heading.topics.length > 0 ? (
                    <ul>
                      {heading.topics.map((topic, idx) => (
                        <li key={idx}>
                          <a href={`/topics/${topic.urlSlug}`}>{topic.topicName}</a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No topics available.</p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PythonCourse;