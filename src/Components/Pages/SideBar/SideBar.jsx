import React, { useState } from 'react';
import './SideBar.css';
import { getContentList } from '../../APIService/apiservice';


function Sidebar({ heading, selectedUrlSlug}) {
  const [expanded, setExpanded] = useState(null);

  const toggleMenu = (index) => {
    setExpanded(index === expanded ? null : index);
  };

  return (
    <div className="siderbar-wrapper">
      <div className="sidebar">
        {heading.map((heading) => (
          <div  key={heading.id}  className={`menu-card ${expanded === heading.id ? 'expanded' : ''}`}  onClick={() => toggleMenu(heading.id)}>
            <div className="menu-title">
              {heading.headingName}
              <i className={`fas fa-chevron-${expanded === heading.id ? "up" : "down"}`}></i>
            </div>
            {expanded === heading.id && (
              <div className="submenu">
               {heading.topics.length > 0 ? (
                  <ul className='p-0'>
                    {heading.topics.map((topic, idx) => (
                      <li key={idx}>
                        <button className='topic-btn' onClick={(e) =>  {
                                                        e.stopPropagation(); 
                                                        selectedUrlSlug(topic.urlSlug)}}>
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

export default Sidebar ;
