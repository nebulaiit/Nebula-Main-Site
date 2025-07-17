import React from 'react';
import './PythonCourse.css';
import { useParams } from 'react-router-dom';
import LanguageHeader from '../NewPage/LanguageHeader';

import LanguageOverview from './LanguageOverview';




const PythonCourse = () => {
  const { courseName } = useParams();


  return (
    <>
      <div className='course-container-wraper'>
        <LanguageHeader />
        <LanguageOverview/>
      
      </div>
    </>
  );
};

export default PythonCourse;