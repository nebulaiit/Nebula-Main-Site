import React from 'react';
import './PythonCourse.css';
import { useParams } from 'react-router-dom';
import LanguageHeader from '../NewPage/LanguageHeader';
import LanguageOverview from './LanguageOverview';
import { useEffect } from 'react';
import { getTutorialOverview } from '../../APIService/apiservice';
import { useState } from 'react';



const PythonCourse = () => {
  const { courseName } = useParams();
  const [tutorialData, setTutorialData] = useState();
  const [tutorialName, setTutorialName] = useState();

  useEffect(() => {
    const fetchTutorialOverview = async () => {
      try {
        const response = await getTutorialOverview(courseName);

        const minimalData = {
          id: response.id,
          name: response.name,
          slug: response.slug,
        }
        setTutorialData(response)
        setTutorialName(minimalData);
        
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchTutorialOverview();
  }, []);


  return (
    <>
      <div className='course-container-wraper'>
        <LanguageHeader tutorialName={tutorialName} />
        <LanguageOverview tutorialData={tutorialData} />

      </div>
    </>
  );
};

export default PythonCourse;