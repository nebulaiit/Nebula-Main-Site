
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
  const darkMode = useSelector((state) => state.darkMode.enabled);
  const [showSections, setShowSections] = useState(false);
  const [section, setSection] = useState(null);
  

  const [data, setData] = useState({ Frontend: [], Backend: [] });

  useEffect(() => {
    const fetchTutorialList = async () => {
      try {
        const response = await getAllTutorial();

        // Group by category
        const groupedData = response.reduce(
          (acc, item) => {
            if (item.category === "Frontend") {
              acc.Frontend.push(item);
            } else if (item.category === "Backend") {
              acc.Backend.push(item);
            }
            return acc;
          },
          { Frontend: [], Backend: [] }
        );

        setData(groupedData);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchTutorialList();
  }, []);


  const handleCourseClick = (tutorialName) => {
    localStorage.setItem('selectedCourse', tutorialName);
    navigate(`/course/${tutorialName}`);
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div className={`coures-wrapper ${darkMode ? 'dark' : ''}`}>
      {isMobile ? (
        <MobileLayout
          data={data}
          onNavigate={handleCourseClick}
          darkMode={darkMode}
        />
      ) : (
        <DesktopLayout
          data={data}
          navigate={navigate}
          section={section}
          setSection={setSection}
          showSections={showSections}
          setShowSections={setShowSections}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

function DesktopLayout({ data, navigate, section, setSection, showSections, setShowSections }) {
  const buttonRef = useRef(null);
  const svgRef = useRef(null);
  const sectionRefs = useRef({});
  const componentRefs = useRef({});
  const headingRef = useRef(null);

  const setRef = useCallback((refs, key) => node => {
    if (node) refs.current[key] = node;
    else delete refs.current[key];
  }, []);

  // ✅ wrap with useCallback so it's stable
  const drawLines = useCallback(() => {
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
      const midY = (startY + endY) / 2;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      line.setAttribute("points", `${startX},${startY} ${startX},${midY} ${endX},${midY} ${endX},${endY}`);
      line.setAttribute("fill", "none");
      line.setAttribute("stroke", "#ff4081");
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
  }, [showSections, section, data]); // 👈 dependencies

  useEffect(() => {
    const id = requestAnimationFrame(drawLines);

    const svgEl = svgRef.current; // ✅ copy ref value

    return () => {
      cancelAnimationFrame(id);
      svgEl?.querySelectorAll('.dynamic-line').forEach(path => path.remove());
    };
  }, [drawLines]); // ✅ safe now


  return (
    <>
      <div className="webdev-btn-wrapper">
        <button ref={buttonRef} onClick={() => { setShowSections(true); setSection(null); }} className="webdev-btn">
          Web Development
        </button>
      </div>

      <svg className="live-curve-svg" ref={svgRef}></svg>

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
                ref={setRef(componentRefs, language.name)}
                className="component-card"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => navigate(`/course/${language.slug}`)} // use slug for URL
              >
                <h4>{language.name}</h4>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function MobileLayout({ data, onNavigate }) {
  const [showSections, setShowSections] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sec) => {
    setExpandedSection(prev => (prev === sec ? null : sec));
  };

  return (
    <>
      <div className="webdev-btn-wrapper">
        <button className="webdev-btn" onClick={() => setShowSections(true)}>
          Web Development
        </button>
      </div>

      {showSections && (
        <div className="accordion-container">
          {Object.keys(data).map((sec) => (
            <div key={sec} className="accordion-item">
              <div className="accordion-header" onClick={() => toggleSection(sec)}>
                <div className="icon-title">
                  {sec === 'Frontend' ? <FaCodeBranch size={20} /> : <FaServer size={20} />}
                  <h3>{sec}</h3>
                </div>
                <span className={`arrow ${expandedSection === sec ? 'open' : ''}`}>▼</span>
              </div>
              <div className={`accordion-content ${expandedSection === sec ? 'show' : ''}`}>
                {data[sec].map((topic) => (
                  <div key={topic} className="sub-card" onClick={() => onNavigate(topic)}>
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
