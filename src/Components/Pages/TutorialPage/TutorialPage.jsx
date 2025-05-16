import React, { useEffect, useState } from 'react'
import Sidebar from '../SideBar/SideBar'
import './Tutorialpage.css'
import { getContentList, getHeadingList } from '../../APIService/apiservice'
import {  useParams } from 'react-router-dom';


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
             console.log(response)
              setSelectedTopicContent(response);
             
            } catch (error) {
              console.error("Error fetching content:", error);
            }
          };
    
          fetchContent();
        }
      }, [selectedUrlSlug])


      const renderBlock = (block) => {
        switch (block.type) {
          case 'heading':
            return <h2 className='content-heading' key={block.id}>{block.value}</h2>;
          case 'paragraph':
            return <p className='content-para' key={block.id}>{block.value}</p>;
          case 'image':
            return (
              <img
                key={block.id}
                src={block.value}
                alt={block.extra?.alt || 'Image'}
                className='content-image'
             
              />
            );
          case 'code':
            return (
              <pre key={block.id} style={{ background: '#f4f4f4', padding: '1rem' }}>
                <code>{block.value}</code>
              </pre>
            );
          case 'video':
            return (
              <iframe
                key={block.id}
                src={block.value}
                title="Video"
                className='content-video'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              >
                
              </iframe>
            );
          default:
            return null;
        }
      };
  
  
  return (
    <>
        <div className="tutorial-page-wrapper py-4">

            <Sidebar heading={headings} selectedUrlSlug={setSelectedUrlSlug} />

            <div className="content-container">
             {selectedTopicContent.map((block) => renderBlock(block))}
            </div>
        </div>

    </>
  )
}
