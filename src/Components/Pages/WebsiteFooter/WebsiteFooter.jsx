import React from 'react';
import './WebsiteFooter.css';
import { useLocation } from 'react-router-dom';

const WebsiteFooter = ({ variant = "default" }) => {
  const sections = {
    'Free Tutorials': [
      'Python 3 Tutorials', 'SQL Tutorials', 'R Tutorials', 'HTML Tutorials', 'CSS Tutorials',
      'JavaScript Tutorials', 'Java Tutorials', 'C Tutorials', 'C++ Tutorials', 'DSA Tutorials',
      'C# Tutorials', 'Golang Tutorials', 'Kotlin Tutorials', 'Swift Tutorials', 'Rust Tutorials'
    ],
    'Paid Courses': [
      'Master Python', 'Learn SQL', 'Learn HTML', 'Master JavaScript',
      'Master C', 'Master C++', 'Master Java', 'Master DSA with Python'
    ],
    'Online Compilers': [
      'Python Compiler', 'R Compiler', 'SQL Editor', 'HTML/CSS Editor',
      'JavaScript Editor', 'Java Compiler', 'C Compiler', 'C++ Compiler',
      'C# Compiler', 'Go Compiler', 'PHP Compiler', 'Swift Compiler', 'Rust Compiler'
    ],
    'Mobile Apps': [
      'Learn Python App', 'Learn C App', 'Learn Java App', 'Learn C++ App'
    ],
    'Company': [
      'About', 'Contact', 'Blog', 'Youtube', 'Careers',
      'Advertising', 'Privacy Policy', 'Terms & Conditions'
    ]
  };

  const location = useLocation();

  const hideElement = ["/login"].includes(location.pathname);

  return (

    <>
      {variant === "default" && !hideElement && (

        <footer className="footer">
          <div className="footer-container">
            {Object.entries(sections).map(([title, links]) => (
              <div className="footer-section" key={title}>
                <h3 className="footer-title">{title}</h3>
                <ul className="footer-links">
                  {links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="footer-link">
                        {link}
                        {link === 'Learn HTML' && title === 'Paid Courses' && (
                          <span className="free-badge">FREE</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Footer */}
          <div className="bottom-footer">
            <p>© 2025 YourCompanyName. All rights reserved.</p>
          </div>
        </footer>
      )}
    
    </>
  );
};

export default WebsiteFooter;