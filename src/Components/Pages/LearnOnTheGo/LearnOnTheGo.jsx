import React from 'react';
import './LearnOnTheGo.css';
import { FaPython, FaCuttlefish, FaJava, FaCode } from 'react-icons/fa';
import logo from "../../Images/Logo/appstore.svg"

const LearnOnTheGo = () => {
  return (
    <div className="app-download-container">
      <div className="app-download-left">
        <h2>Learn on the Go: Programiz for iOS & Android</h2>
        <p>
          Take your learning on the go with our highly rated iOS and Android apps—
          perfect for practicing during your commute or coffee break.
        </p>
        <div className="app-download-badges">
          <img src= {logo} alt="Google Play" />
          <img src= {logo} alt="App Store" />
        </div>
      </div>

      <div className="app-download-cards">
        <div className="app-card">
          <FaPython className="card-icon" />
          <h4>Learn Python App</h4>
          <a href="#">Learn more →</a>
        </div>
        <div className="app-card">
          <FaCuttlefish className="card-icon" />
          <h4>Learn C Programming App</h4>
          <a href="#">Learn more →</a>
        </div>
        <div className="app-card">
          <FaJava className="card-icon" />
          <h4>Learn Java App</h4>
          <a href="#">Learn more →</a>
        </div>
        <div className="app-card">
          <FaCode className="card-icon" />
          <h4>Learn C++ App</h4>
          <a href="#">Learn more →</a>
        </div>
      </div>
    </div>
  );
};

export default LearnOnTheGo;
