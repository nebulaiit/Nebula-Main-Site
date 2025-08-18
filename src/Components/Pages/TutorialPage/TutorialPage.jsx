import React, { useEffect, useState, useRef } from 'react';
import SideBar from '../SideBar/SideBar';
import './Tutorialpage.css';
import { useParams, useSearchParams } from 'react-router-dom';
import SelectedTopicContent from './selectedTopicContent';
import { useSelector } from 'react-redux';
import { getContentList, getTopics, getTutorialDetails } from '../../APIService/apiservice';


export default function TutorialPage() {
  const { courseName } = useParams();
  const [tutorial, setTutorial] = useState()
  const [headings, setHeadings] = useState([])
  const [selectedUrlSlug, setSelectedUrlSlug] = useState(null);
  const [selectedTopicContent, setSelectedTopicContent] = useState([])
  const darkMode = useSelector((state) => state.darkMode.enabled);

  const id = tutorial?.id;
  console.log(id)

  useEffect(() => {

    const fetchTopicsList = async () => {
      try {

        const response = await getTutorialDetails(courseName);

        setTutorial(response);

      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchTopicsList();
  }, [courseName])

  useEffect(() => {
  if (!tutorial?.id) return; // 🔒 guard clause
    const fetchTopicsList = async () => {
      try {

        const response = await getTopics(id);
        setHeadings(response)
        console.log(response);

      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchTopicsList();
  }, [tutorial?.id])

  // Fetch topic content
  useEffect(() => {
    if (selectedUrlSlug) {
      const fetchContent = async () => {
        try {
          const response = await getContentList(selectedUrlSlug); // Fetch content based on the current slug
          setSelectedTopicContent(response);
          console.log(response);

        } catch (error) {
          console.error("Error fetching content:", error);
        }
      };

      fetchContent();
    }
  }, [selectedUrlSlug])

  // On topic click


  return (
    <div className={`tutorial-page-wrapper py-4 px-4  ${darkMode ? 'dark' : ''}`}>
      <SideBar heading={headings} selectedUrlSlug={setSelectedUrlSlug} />

      <SelectedTopicContent contentBlocks={selectedTopicContent} />

    </div>
  );
}
