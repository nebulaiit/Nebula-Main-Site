import React, { useEffect, useState, useRef } from 'react';
import SideBar from '../SideBar/SideBar';
import './Tutorialpage.css';
import { getContentList, getHeadingList } from '../../APIService/apiservice';
import { useParams, useSearchParams } from 'react-router-dom';
import SelectedTopicContent from './selectedTopicContent';
import { useSelector } from 'react-redux';

export default function TutorialPage() {
  const { courseName } = useParams();
  const [headings, setHeadings] = useState([])
  const [selectedUrlSlug, setSelectedUrlSlug] = useState(null);
  const [selectedTopicContent, setSelectedTopicContent] = useState([])
  const darkMode = useSelector((state) => state.darkMode.enabled);


  // Fetch headings

  useEffect(() => {

    const fetchHeadingList = async () => {
      try {

        const response = await getHeadingList(courseName);

        setHeadings(response);

      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchHeadingList();
  }, [])

  // Fetch topic content
  useEffect(() => {
    if (selectedUrlSlug) {
      const fetchContent = async () => {
        try {
          const response = await getContentList(selectedUrlSlug); // Fetch content based on the current slug
          console.log(response)
          setSelectedTopicContent(response);

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
