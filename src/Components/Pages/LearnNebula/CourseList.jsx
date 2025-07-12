  import React, { useCallback, useEffect, useRef, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faPython, faJs, faJava, faHtml5, faCss3, faReact } from '@fortawesome/free-brands-svg-icons';
  import { faDatabase } from '@fortawesome/free-solid-svg-icons';
  import { FaCodeBranch, FaServer } from 'react-icons/fa';
  import './CourseList.css';
  import { getAllTutorial } from '../../APIService/apiservice';

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

    const buttonRef = useRef(null);
    const svgRef = useRef(null);
    const sectionRefs = useRef({});
    const componentRefs = useRef({});
    const headingRef = useRef(null);

    const iconMap = {
      Python: { icon: 'python', type: 'fab' },
      MySql: { icon: 'database', type: 'fas' },
      Java: { icon: 'java', type: 'fab' },
      'React.js': { icon: 'react', type: 'fab' },
      HTML: { icon: 'html5', type: 'fab' },
      CSS: { icon: 'css3', type: 'fab' },
    };

    useEffect(() => {
      const fetchTutorialList = async () => {
        try {
          const response = await getAllTutorial();
          const mappedCourses = response.map(course => {
            const iconInfo = iconMap[course.tutorialName] || { icon: 'question', type: 'fas' };
            return { ...course, icon: iconInfo.icon, type: iconInfo.type };
          });
          setCourses(mappedCourses);
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

    const drawCurvedLine = (start, end, delay = 0) => {
      if (!start || !end || !svgRef.current) return;

      const svgBox = svgRef.current.getBoundingClientRect();
      const startBox = start.getBoundingClientRect();
      const endBox = end.getBoundingClientRect();

      const startX = startBox.left + startBox.width / 2 - svgBox.left;
      const startY = startBox.top + startBox.height - svgBox.top;
      const endX = endBox.left + endBox.width / 2 - svgBox.left;
      const endY = endBox.top - svgBox.top;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${startX},${startY} C${startX},${startY + (endY - startY) * 0.6} ${endX},${endY - (endY - startY) * 0.6} ${endX},${endY}`);
      path.setAttribute('class', 'fancy-line dynamic-line');

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = length;

      svgRef.current.appendChild(path);
      void path.offsetWidth;

      setTimeout(() => {
        path.style.strokeDashoffset = 0;
      }, delay);
    };

    const drawLines = () => {
      const svg = svgRef.current;
      if (!svg) return;

      svg.querySelectorAll('.dynamic-line').forEach(path => path.remove());
      let delay = 0;
      const increment = 300;

      if (showSections && !section && buttonRef.current) {
        Object.keys(data).forEach(sec => {
          drawCurvedLine(buttonRef.current, sectionRefs.current[sec], delay);
          delay += increment;
        });
      } else if (section && headingRef.current) {
        data[section].forEach((lang, i) => {
          const langEl = componentRefs.current[lang];
          drawCurvedLine(headingRef.current, langEl, i * increment);
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

    const handleCourseClick = tutorialName => {
      localStorage.setItem('selectedCourse', tutorialName);
      navigate(`/course/${tutorialName}`);
    };

    const handleWebDevClick = () => {
      setShowSections(true);
      setSection(null);
    };

    return (
      <div className="coures-wrapper">
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
                className="card"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => setSection(sec)}
              >
                <div className="icon-title">
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
                  className="component-card"
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
