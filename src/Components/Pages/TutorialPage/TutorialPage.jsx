import React, { useEffect, useState } from 'react'
import Sidebar from '../SideBar/SideBar'
import './Tutorialpage.css'
import { getContentList, getHeadingList } from '../../APIService/apiservice'
import { useNavigate, useParams } from 'react-router-dom';


export default function TutorialPage() {

  const { courseName } = useParams();
  const [headings, setHeadings] = useState([])
  const [selectedUrlSlug, setSelectedUrlSlug] = useState(null); 
  const [selectedTopicContent , setSelectedTopicContent] = useState ([])

    useEffect(()=>{
    
        const fetchHeadingList = async () =>{
          try {
    
            const response = await getHeadingList(courseName);
      
            setHeadings(response);
            
          } catch (error) {
            console.error("Error fetching documents:", error);
          }
        };
        fetchHeadingList();
      }, [])

      useEffect(() => {
        if (selectedUrlSlug) {
          const fetchContent = async () => {
            try {
              const response = await getContentList(selectedUrlSlug); // Fetch content based on the current slug
             
              setSelectedTopicContent(response);
             
            } catch (error) {
              console.error("Error fetching content:", error);
            }
          };
    
          fetchContent();
        }
      }, [selectedUrlSlug])
  
  
  return (
    <>
        <div className="tutorial-page-wrapper">

            <Sidebar heading={headings} selectedUrlSlug={setSelectedUrlSlug} />

            <div className="content-container">
              {selectedTopicContent.map((content)=>(
                <div key={content.id}>
                   <h5>{content.contentHeading}</h5>
                   <p>{content.content}</p>
                </div>
              ))}
            </div>
        </div>

    </>
  )
}
