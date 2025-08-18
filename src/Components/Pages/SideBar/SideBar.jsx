import React, { useState } from 'react';
import './SideBar.css';
import { useSelector } from 'react-redux';

function SideBar({ heading, selectedUrlSlug }) {
  const [activeSlug, setActiveSlug] = useState(null);
  const darkMode = useSelector((state) => state.darkMode.enabled);

  return (
    <div className={`siderbar-wrapper ${darkMode ? 'dark' : ''}`}>
      <div className="sidebar">
        {[...heading]
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((item) => (
            <div key={item.id} className="menu-card">
     
                <button
                  className={`topic-btn ${activeSlug === item.slug ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlug(item.slug);          // highlight active
                    console.log(item.slug);          // highlight active
                    selectedUrlSlug(item.slug);        // callback to parent
                  }}
                >
                  {item.name}
                </button>
              
            </div>
          ))}
      </div>
    </div>
  );
}

export default SideBar;
