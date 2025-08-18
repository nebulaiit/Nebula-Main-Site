// Components/Courses.js
import React, { useRef, useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import Sidebar from "./Sidebar";
import TabSection from "./TabSection";
import "./Courses.css";

const courseSections = [
  {
    title: "Section 1: Getting Started",
    lessons: ["Introduction", "Installation", "Project Setup"],
    lessonVideos: [
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://www.w3schools.com/html/movie.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4",
    ],
  },
  {
    title: "Section 2: Components",
    lessons: ["Functional Components", "Class Components"],
    lessonVideos: [
      "https://www.w3schools.com/html/movie.mp4",
      "https://www.w3schools.com/html/mov_bbb.mp4",
    ],
  },
];


const tabContent = {
  Overview: {
    title: "Course Overview",
    description: `
      This course is designed to take you from beginner to pro in full-stack web development.
      You'll build real-world projects using React, Node.js, and MongoDB.
    `,
    objectives: [
      "Build modern, responsive websites using HTML, CSS, and JavaScript",
      "Understand React fundamentals including hooks and state management",
      "Create RESTful APIs with Node.js and Express",
      "Integrate MongoDB for full-stack applications",
      "Deploy applications on cloud platforms like Vercel and Render"
    ],
    requirements: [
      "Basic understanding of HTML, CSS, and JavaScript",
      "A laptop or desktop with internet access",
      "No prior experience with React or Node required"
    ],
    audience: "Aspiring full-stack developers, frontend/backend engineers, freelancers, and tech enthusiasts."
  },

  Instructor: {
    name: "Shubham Musale",
    title: "Senior Software Engineer | Full Stack Trainer",
    bio: `
      Shubham has over 7 years of experience in web development and has trained 10,000+ students.
      His teaching style focuses on real-world applications, clean code, and project-based learning.
    `,
    image: "https://source.unsplash.com/150x150/?man,developer", // Replace with real instructor image if available
    links: {
      linkedin: "https://linkedin.com/in/shubhammusale",
      github: "https://github.com/shubhammusale"
    }
  },

  Reviews: {
    averageRating: 4.7,
    totalReviews: 284,
    comments: [
      {
        name: "Aarti Verma",
        comment: "Clear explanation and great hands-on projects. Loved it!",
        rating: 5
      },
      {
        name: "Rohit Patil",
        comment: "Well-structured and beginner friendly. Highly recommended!",
        rating: 4.5
      },
      {
        name: "Neha Sharma",
        comment: "Exactly what I needed to land my first frontend job.",
        rating: 5
      }
    ]
  },

  Resources: {
    downloadableAssets: [
      {
        name: "Project Boilerplate Code",
        link: "#"
      },
      {
        name: "Cheat Sheet: React Hooks",
        link: "#"
      },
      {
        name: "MongoDB Schema Design PDF",
        link: "#"
      }
    ],
    externalLinks: [
      {
        label: "MDN Web Docs",
        url: "https://developer.mozilla.org/"
      },
      {
        label: "React Official Docs",
        url: "https://reactjs.org/docs/getting-started.html"
      },
      {
        label: "Free Deployment Guide",
        url: "#"
      }
    ]
  }
};

const CoursesPlay = () => {
  const videoRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedLessons, setSelectedLessons] = useState({});
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    setSelectedLessons({ 0: new Set([0]) });
    setCurrentVideoSrc(courseSections[0].lessonVideos[0]);
    setExpandedSection(0);
  }, []);

  const skipTime = (seconds) => {
    if (videoRef.current) videoRef.current.currentTime += seconds;
  };

  const changePlaybackRate = (rate) => setPlaybackRate(rate);

  const toggleLesson = (sectionIndex, lessonIndex) => {
    setSelectedLessons((prev) => {
      const prevLessons = prev[sectionIndex] || new Set();
      const newLessons = new Set();
      newLessons.add(lessonIndex);

      const newVideoSrc =
        courseSections[sectionIndex].lessonVideos[lessonIndex] ||
        `/src/Components/Pages/LearningDashboard/section${sectionIndex + 1}-lesson${lessonIndex + 1}.mp4`;
      setCurrentVideoSrc(newVideoSrc);

      return { ...prev, [sectionIndex]: newLessons };
    });
  };

  const handleSectionClick = (index) => {
    setExpandedSection((prev) => (prev === index ? null : index));
  };

  return (
    <div className="course-container">
      <div style={{ display: "flex", gap: "20px" }}>
        <VideoPlayer
          videoRef={videoRef}
          src={currentVideoSrc}
          playbackRate={playbackRate}
          skipTime={skipTime}
          changePlaybackRate={changePlaybackRate}
        />

        <Sidebar
          courseSections={courseSections}
          selectedLessons={selectedLessons}
          expandedSection={expandedSection}
          handleSectionClick={handleSectionClick}
          toggleLesson={toggleLesson}
        />
      </div>

      <TabSection
        tabContent={tabContent}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default CoursesPlay;