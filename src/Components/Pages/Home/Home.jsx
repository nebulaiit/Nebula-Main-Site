import React from 'react';
import './home.css';
import { Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ServicesSection from './ServicesSection/ServicesSection';
import InteractiveLearningSection from './InteractiveLearningSection/InteractiveLearningSection';

import WhyNebula from './WhyNebula/WhyNebula';
import HeroSection from './HeroSection/HeroSection';
import Benefits from './Benefits/Benefits';

export default function Home() {

  return (
    <div className="container-fluid homepage">
   
      <HeroSection/>
      <Benefits/>
      <InteractiveLearningSection />
      <WhyNebula />
      <ServicesSection /> 

    </div>
  );
}
