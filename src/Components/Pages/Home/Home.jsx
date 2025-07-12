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
import HeroSection from '../HeroSection/HeroSection';
import Benefits from '../Benefits/Benefits';

export default function Home() {

  const images = 'https://drive.google.com/uc?export=view&id=1azJwJHfp5ubvWf1m_lk1NntoMLkpZyoj'
  return (
    <div className="container-fluid homepage">
   
      <HeroSection/>

      {/* <CourseList /> */}

      <Benefits/>

      {/* <CurvedSection /> */}

      <InteractiveLearningSection />

      {/* <OnlineCompilers /> */}

      <WhyNebula />

      {/* <AboutAgencyPage /> */}

      <ServicesSection />

    </div>
  );
}
