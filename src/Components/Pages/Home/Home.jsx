import React from 'react';
import './home.css';
import { Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ServicesSection from '../ServicesSection/ServicesSection';
import InteractiveLearningSection from '../InteractiveLearningSection/InteractiveLearningSection';

import OnlineCompilers from '../OnlineCompilers/OnlineCompilers';
import CourseList from '../LearnNebula/CourseList';
import CurvedSection from '../CurvedSection/CurvedSection';
import WhyNebula from '../WhyNebula/WhyNebula';
import AboutAgencyPage from '../AboutPage/AboutPage';

export default function Home() {
  return (
    <div className="container-fluid homepage">
      {/* ✅ Hero Section */}
      <div className="hero-section">
        <div className="content-box-home">
          <h1>
            Creative Web <br />
            Development <br />
            Company
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus,
            risus sit amet auctor sodales, justo erat tempor eros.
          </p>
          <Button>
            Get A Free Quote <KeyboardArrowRightIcon />
            <span className="circle"></span>
          </Button>
        </div>
        
      </div>

      {/* ✅ Course List */}
      <CourseList />

      {/* ✅ Curved Section */}
      <CurvedSection />

      {/* ✅ Interactive Learning */}
      <InteractiveLearningSection />

      {/* ✅ Practice with Compilers */}
      <OnlineCompilers />


      {/* ✅ Why Nebula */}
      <WhyNebula />

      {/* ✅ About Page */}
      <AboutAgencyPage />

      {/* ✅ Services Section */}
      <ServicesSection />

      {/* ✅ Learn On The Go */}
      {/* <LearnOnTheGo /> */}
    </div>
  );
}
