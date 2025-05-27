
 import React from 'react';

import './WhyNebula.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faStar, faCode } from '@fortawesome/free-solid-svg-icons';

const WhyNebula = () => {
  return (
    <div className="why-nebula">
  <h2 className="why-nebula__title">Why Nebula IT?</h2>
  <div className="why-nebula__cards">
    <div className="why-nebula__card">
      <div className="why-nebula__icon">
        <FontAwesomeIcon icon={faCheckCircle} />
      </div>
      <h4 className="why-nebula__card-title">For programmers, by programmers</h4>
      <p className="why-nebula__card-text">We're not just teachers—we're active programmers creating resources we wish we had when learning to code.</p>
    </div>
    <div className="why-nebula__card">
      <div className="why-nebula__icon">
        <FontAwesomeIcon icon={faStar} />
      </div>
      <h4 className="why-nebula__card-title">Coding isn't easy</h4>
      <p className="why-nebula__card-text">We believe in honest, practical learning. Expect to work hard, write lots of code, and build genuine programming skills that employers value.</p>
    </div>
    <div className="why-nebula__card">
      <div className="why-nebula__icon">
        <FontAwesomeIcon icon={faCode} />
      </div>
      <h4 className="why-nebula__card-title">Learn by doing</h4>
      <p className="why-nebula__card-text">Theory alone isn't enough. Every concept has complete code examples you can run, modify, and use in your projects.</p>
    </div>
  </div>
</div>


  );
};

export default WhyNebula;
