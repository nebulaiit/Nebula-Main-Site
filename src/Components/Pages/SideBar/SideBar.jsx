import React, { useEffect, useState } from 'react';
import './SideBar.css';
import { useSelector } from 'react-redux';

function SideBar({ heading, selectedUrlSlug }) {
  const [expanded, setExpanded] = useState(null);
  const [activeSlug, setActiveSlug] = useState(null);
  const darkMode = useSelector((state) => state.darkMode.enabled);


  useEffect(() => {
    if (heading.length > 0) {
      const sortedHeadings = [...heading].sort((a, b) => a.orderIndex - b.orderIndex);
      const firstHeading = sortedHeadings[0];
      setExpanded(firstHeading.id);

      if (firstHeading.topics && firstHeading.topics.length > 0) {
        selectedUrlSlug(firstHeading.topics[0].urlSlug);
      }
    }
  }, [heading, selectedUrlSlug]);

  const toggleMenu = (index) => {
    setExpanded(index === expanded ? null : index);
  };

  return (
    <div className={`siderbar-wrapper ${darkMode ? 'dark' : ''}`}>
      <div className="sidebar">
        {[...heading]
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((heading) => (
            <div
              key={heading.id}
              className={`menu-card ${expanded === heading.id ? 'expanded' : ''}`}
              onClick={() => toggleMenu(heading.id)}
            >
              <div className="menu-title">
                {heading.headingName}
                <i className={`fas fa-chevron-${expanded === heading.id ? 'up' : 'down'}`}></i>
              </div>
              {expanded === heading.id && (
                <div className="submenu">
                  {heading.topics.length > 0 ? (
                    <ul className="p-0">
                      {heading.topics.map((topic, idx) => (
                        <li key={idx}>
                          <button
                            className={`topic-btn ${activeSlug === topic.urlSlug ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSlug(topic.urlSlug); // sets active
                              selectedUrlSlug(topic.urlSlug); // your existing callback
                            }}
                          >
                            {topic.topicName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No topics available.</p>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default SideBar;
