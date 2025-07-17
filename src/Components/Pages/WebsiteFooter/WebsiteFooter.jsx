import React from 'react';
import './WebsiteFooter.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const WebsiteFooter = () => {
  const location = useLocation();
  const hideElement = ["/login"].includes(location.pathname);

  const sections = {
    'Qubitron X': [
      'Loren lopude',
      'Dolor Site mete',
    ],
    'Sitemap': [
      'Tutorial',
      'Courses',
      'Career',
      'Blogs',
    ],
    'Other': [
      'Term of Service',
      'Credit',
      'Privacy Policy',
    ],
  };

  return (
    <>
      {!hideElement && (
        <footer className="footer">
          <div className="footer-container">
            {Object.entries(sections).map(([title, links]) => (
              <div className="footer-section" key={title}>
                <h3 className="footer-title">{title}</h3>
                <ul className="footer-links">
                  {links.map((link, index) => (
                    <li key={`${title}-${index}`}>
                      <Link to="#" className="footer-link">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="footer-section">
              <h3 className="footer-title">Stay Connected</h3>
              <div className="social-icons">
                <Link to="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link to="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} />
                </Link>
                <Link to="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
              </div>
            </div>
          </div>

          <div className="bottom-footer">
            <p>© 2025 Qubitron X. All rights reserved.</p>
          </div>
        </footer>
      )}
    </>
  );
};

export default WebsiteFooter;
