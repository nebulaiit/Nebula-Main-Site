import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPython, faJs, faJava, faHtml5, faCss3, faReact } from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { FaCodeBranch, FaServer } from 'react-icons/fa';
import './CourseList.css';
import { getAllTutorial } from '../../APIService/apiservice';
import { useSelector } from 'react-redux';

library.add(faPython, faJs, faJava, faHtml5, faCss3, faDatabase, faReact);

export default function CourseList() {
  const navigate = useNavigate();
  const data = {
    Frontend: ['HTML', 'CSS', 'JavaScript', 'Angular', 'React'],
    Backend: ['NodeJS', 'Database', 'Java', 'Python', 'Ruby'],
  };

  const [courses, setCourses] = useState([]);
  const [section, setSection] = useState(null);
  const [showSections, setShowSections] = useState(false);
  const darkMode = useSelector((state) => state.darkMode.enabled);

  const buttonRef = useRef(null);
  const svgRef = useRef(null);
  const sectionRefs = useRef({});
  const componentRefs = useRef({});
  const headingRef = useRef(null);


  useEffect(() => {
    const fetchTutorialList = async () => {
      try {
        const response = await getAllTutorial();
      
        setCourses(response);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchTutorialList();
  }, []);

  const setRef = useCallback((refs, key) => node => {
    if (node) refs.current[key] = node;
    else delete refs.current[key];
  }, []);


  const drawLines = () => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.querySelectorAll('.dynamic-line').forEach(path => path.remove());
    let delay = 0;
    const increment = 300;

    const drawStraightLine = (fromEl, toEl, delay = 0, dashed = false) => {
      if (!fromEl || !toEl) return;

      const svgRect = svg.getBoundingClientRect();
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const startX = fromRect.left + fromRect.width / 2 - svgRect.left;
      const startY = fromRect.bottom - svgRect.top;

      const endX = toRect.left + toRect.width / 2 - svgRect.left;
      const endY = toRect.top - svgRect.top;

      // Create vertical and horizontal segments
      const midY = (startY + endY) / 2;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      line.setAttribute("points", `${startX},${startY} ${startX},${midY} ${endX},${midY} ${endX},${endY}`);
      line.setAttribute("fill", "none");
      line.setAttribute("stroke", "#ff4081"); // You can customize color
      line.setAttribute("stroke-width", "3");
      line.setAttribute("class", "dynamic-line");
      if (dashed) line.setAttribute("stroke-dasharray", "6,6");

      line.style.opacity = 0;
      svg.appendChild(line);

      setTimeout(() => {
        line.style.transition = "opacity 0.3s ease";
        line.style.opacity = 1;
      }, delay);
    };

    if (showSections && !section && buttonRef.current) {
      Object.keys(data).forEach(sec => {
        drawStraightLine(buttonRef.current, sectionRefs.current[sec], delay, false);
        delay += increment;
      });
    } else if (section && headingRef.current) {
      data[section].forEach((lang, i) => {
        const langEl = componentRefs.current[lang];
        drawStraightLine(headingRef.current, langEl, i * increment, true);
      });
    }
  };


  useEffect(() => {
    const id = requestAnimationFrame(drawLines);
    return () => {
      cancelAnimationFrame(id);
      svgRef.current?.querySelectorAll('.dynamic-line').forEach(path => path.remove());
    };
  }, [section, showSections]);

  useEffect(() => {
    const handleResize = () => setSection(prev => prev);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCourseClick = (tutorialName) => {
    localStorage.setItem('selectedCourse', tutorialName);
    navigate(`/course/${tutorialName}`);
  };

  const handleWebDevClick = () => {
    setShowSections(true);
    setSection(null);
  };

  return (
    <div className={`coures-wrapper ${darkMode ? 'dark' : ''}`}>
      <div className="webdev-btn-wrapper">
        <button ref={buttonRef} onClick={handleWebDevClick} className="webdev-btn">
          Web Development
        </button>
      </div>

      <svg className="live-curve-svg" ref={svgRef}>
        <defs>
          <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1565c0" />
            <stop offset="100%" stopColor="#42a5f5" />
          </linearGradient>
        </defs>
      </svg>

      {showSections && !section && (
        <div className="section-row fade-in">
          {Object.keys(data).map((sec, i) => (
            <div
              key={sec}
              ref={setRef(sectionRefs, sec)}
              className="card "
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => setSection(sec)}
            >
              <div className="icon-title ">
                {sec === 'Frontend' ? <FaCodeBranch size={22} /> : <FaServer size={22} />}
                <h3>{sec}</h3>
              </div>
              <p>{data[sec].length} Topics</p>
            </div>
          ))}
        </div>
      )}

      {section && (
        <>
          <h2 ref={headingRef} className="sub-title">{section}</h2>
          <div className="component-row fade-in">
            {data[section].map((language, i) => (
              <div
                key={language}
                ref={setRef(componentRefs, language)}
                className="component-card "
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => handleCourseClick(language)}
              >
                <h4>{language}</h4>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
