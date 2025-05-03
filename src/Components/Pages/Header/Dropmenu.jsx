import React, { useEffect, useState } from 'react'
import './header.css'  
import CloseIcon from '@mui/icons-material/Close';
import { getAllTutorial, getTopics } from '../../APIService/apiservice';

export default function Dropmenu({ closeDropdown, activeMenu }) {
  const [tutorial, setTutorial] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTutorialList = async () => {
      try {
        const response = await getAllTutorial();
        setTutorial(response);
        console.log(response);

        // Auto-load MySQL topics when "tutorial" menu is active
        if (activeMenu === "tutorial") {
          const TutorialId = response.find(item => item.tutorialName.toLowerCase() === "java");
          if (TutorialId) {
            fetchTopicList(TutorialId.id);
          }
        }

      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };

    fetchTutorialList();
  }, [activeMenu]); // refetch when dropdown tab changes

  const fetchTopicList = async (id) => {
    try {
      const response = await getTopics(id);
      setTopics(response);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  return (
    <div className="dropdown_menu d-flex">
      <span className="close-btn" onClick={closeDropdown}>
        <CloseIcon />
      </span>

      <div className="left-box">
        <ul>
          {activeMenu === "tutorial" &&
            tutorial.map((item) => (
              <li key={item.id}>
                <button className='tutorial-btn' onClick={() => fetchTopicList(item.id)}>
                  {item.tutorialName}
                </button>
              </li>
            ))
          }

          {activeMenu === "examples" &&
            ["If-Else", "Loops", "CRUD", "Form Validation"].map((ex, i) => (
              <li key={i}><button className='tutorial-btn'>{ex}</button></li>
            ))
          }

          {activeMenu === "courses" &&
            tutorial.map((item) => (
              <li key={item.id}><button className='tutorial-btn'>{item.tutorialName}</button></li>
            ))
          }

          {activeMenu === "career" &&
            ["Interview Prep", "Resume Building", "Tech Stacks"].map((career, i) => (
              <li key={i}><button className='tutorial-btn'>{career}</button></li>
            ))
          }
        </ul>
      </div>

      <div className="right-box">
        <div className="pro-box d-flex align-items-center justify-content-center">
          <h5>Unlock PRO Content</h5>
        </div>

        <div className="course-detail-box">
          <div className="topic-list">
            <p>Popular Topics</p>
            <ul className='p-0'>
              {topics.map((topic) => (
                <li key={topic.id}>{topic.topicName}</li>
              ))}
            </ul>
          </div>

          <div className="material-list">
            <p>Learning Paths</p>
            <ul>
              <li>Web Development</li>
              <li>Data Science</li>
              <li>Machine Learning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
