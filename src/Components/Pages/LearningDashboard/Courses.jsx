 import React, { useRef, useState, useEffect } from "react";
import "./Courses.css";
import {
  Replay10,
  Forward10,
  Speed,
  Star,
  CalendarToday,
  Language,
  Person,
  Announcement,
} from "@mui/icons-material";

const courseSections = [
  {
    title: "Section 1: Introduction",
    duration: "16min",
    lessons: 2,
    lessonTimes: ["8min", "8min"],
    description:
      "This section introduces the basics of Java and the development environment setup.",
    // Specify explicit video paths here per lesson if you want custom videos:
    lessonVideos: [
      "/src/Components/Pages/LearningDashboard/paymentpage.mp4",
      "/src/Components/Pages/LearningDashboard/section1-lesson2.mp4",
    ],
  },
  {
    title: "Section 2: Types of Applications",
    duration: "13min",
    lessons: 4,
    lessonTimes: ["3min", "3min", "3min", "4min"],
    description:
      "Explore different types of Java applications like desktop, web, and enterprise.",
    lessonVideos: [
      "/src/Components/Pages/LearningDashboard/section2-lesson1.mp4",
      "/src/Components/Pages/LearningDashboard/section2-lesson2.mp4",
      "/src/Components/Pages/LearningDashboard/section2-lesson3.mp4",
      "/src/Components/Pages/LearningDashboard/section2-lesson4.mp4",
    ],
  },
  {
    title: "Section 3: Technologies in Development",
    duration: "22min",
    lessons: 3,
    lessonTimes: ["7min", "8min", "7min"],
    description: "Understand the tech stack used in Java-based projects.",
    lessonVideos: [
      "/src/Components/Pages/LearningDashboard/section3-lesson1.mp4",
      "/src/Components/Pages/LearningDashboard/section3-lesson2.mp4",
      "/src/Components/Pages/LearningDashboard/section3-lesson3.mp4",
    ],
  },
  {
    title: "Section 4: Java Concepts",
    duration: "52min",
    lessons: 3,
    lessonTimes: ["17min", "18min", "17min"],
    description:
      "Covers core Java concepts like OOP, data types, and control statements.",
    lessonVideos: [
      "/src/Components/Pages/LearningDashboard/section4-lesson1.mp4",
      "/src/Components/Pages/LearningDashboard/section4-lesson2.mp4",
      "/src/Components/Pages/LearningDashboard/section4-lesson3.mp4",
    ],
  },
  {
    title: "Section 5: Stepping into Programming",
    duration: "19min",
    lessons: 1,
    lessonTimes: ["19min"],
    description: "A guided walkthrough of your first Java program.",
    lessonVideos: ["/src/Components/Pages/LearningDashboard/section5-lesson1.mp4"],
  },
  {
    title: "Section 6: Comments & Keywords",
    duration: "47min",
    lessons: 3,
    lessonTimes: ["15min", "16min", "16min"],
    description: "Learn about Java syntax, comments, and reserved keywords.",
    lessonVideos: [
      "/src/Components/Pages/LearningDashboard/section6-lesson1.mp4",
      "/src/Components/Pages/LearningDashboard/section6-lesson2.mp4",
      "/src/Components/Pages/LearningDashboard/section6-lesson3.mp4",
    ],
  },
  {
    title: "Section 7: Using Editplus Software",
    duration: "14min",
    lessons: 2,
    lessonTimes: ["7min", "7min"],
    description: "Using Editplus for coding and managing Java files.",
    lessonVideos: [
      "/src/Components/Pages/LearningDashboard/section7-lesson1.mp4",
      "/src/Components/Pages/LearningDashboard/section7-lesson2.mp4",
    ],
  },
];

const tabContent = {
  Overview: (
    <>
      <h3>Learn Java from scratch and become a Software Engineer.</h3>
      <div className="info-row">
        <Star style={{ color: "#f5b50a" }} /> 4.3 (3,293 ratings)
        <Person /> 291,575 students
        <Speed /> 45.5 hours total
      </div>
      <div className="info-row">
        <CalendarToday /> Last updated May 2025
        <Language /> English [Auto]
      </div>
    </>
  ),
  "Q&A": (
    <>
      <h4>Common Questions</h4>
      <p>
        <strong>Q:</strong> Is this course beginner-friendly?
        <br />
        <strong>A:</strong> Yes, absolutely!
      </p>
      <p>
        <strong>Q:</strong> What software do I need?
        <br />
        <strong>A:</strong> JDK, Editplus or Eclipse.
      </p>
    </>
  ),
  Notes: (
    <>
      <h4>Course Notes</h4>
      <ul>
        <li>Set up Java environment</li>
        <li>Practice OOP concepts</li>
        <li>Complete all quizzes</li>
        <li>Download sample projects</li>
      </ul>
    </>
  ),
  Announcements: (
    <>
      <Announcement /> <strong>Upcoming Updates</strong>
      <p>
        New content will be added in June 2025!
        <br />
        Stay tuned for JavaFX module.
      </p>
    </>
  ),
  Reviews: (
    <>
      <h4>Student Reviews</h4>
      <div className="review">
        <Star style={{ color: "#f5b50a" }} /> <strong>4.3</strong> - “Very helpful for
        beginners!”
        <p>
          <em>— Ayesha, May 2025</em>
        </p>
      </div>
      <div className="review">
        <Star style={{ color: "#f5b50a" }} /> <strong>4.0</strong> - “Good intro but could
        include more advanced topics.”
        <p>
          <em>— Rohan, April 2025</em>
        </p>
      </div>
      <div className="review">
        <Star style={{ color: "#f5b50a" }} /> <strong>5.0</strong> - “Excellent course
        with hands-on projects!”
        <p>
          <em>— Priya, March 2025</em>
        </p>
      </div>
    </>
  ),
};

const Courses = () => {
  const videoRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedLessons, setSelectedLessons] = useState({});
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    // On load, select first lesson of first section by default
    setSelectedLessons({ 0: new Set([0]) });
    setCurrentVideoSrc(courseSections[0].lessonVideos[0]);
    setExpandedSection(0);
  }, []);

  const skipTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
  };

  const toggleLesson = (sectionIndex, lessonIndex) => {
    setSelectedLessons((prev) => {
      const prevLessons = prev[sectionIndex] || new Set();
      const newLessons = new Set(prevLessons);

      if (newLessons.has(lessonIndex)) {
        newLessons.delete(lessonIndex);
      } else {
        newLessons.clear(); // only allow one lesson selected at a time per section
        newLessons.add(lessonIndex);
      }

      // Use explicit video path if available
      const newVideoSrc =
        courseSections[sectionIndex].lessonVideos[lessonIndex] ||
        `/src/Components/Pages/LearningDashboard/section${sectionIndex + 1}-lesson${lessonIndex + 1}.mp4`;

      setCurrentVideoSrc(newVideoSrc);

      return { ...prev, [sectionIndex]: newLessons };
    });
  };

  const handleSectionClick = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const countChecked = (sectionIndex) =>
    selectedLessons[sectionIndex] ? selectedLessons[sectionIndex].size : 0;

  return (
    <div
      className="course-container"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      {/* Top row: Video + Sidebar */}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Video on left */}
        <div className="video-player" style={{ flex: 2 }}>
          <video
            ref={videoRef}
            controls
            src={currentVideoSrc}
            width="100%"
            height="auto"
            key={currentVideoSrc}
          />
          <div className="controls" style={{ marginTop: "10px" }}>
            <button onClick={() => skipTime(-10)}>
              <Replay10 />
            </button>
            <button onClick={() => skipTime(10)}>
              <Forward10 />
            </button>
            <select
              onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
              value={playbackRate}
            >
              <option value="0.5">0.5x</option>
              <option value="1">1x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </div>
        </div>

        {/* Sidebar on right */}
        <div className="sidebar" style={{ flex: 1, maxWidth: "300px" }}>
          <h2>Course content</h2>
          {courseSections.map((section, sectionIndex) => (
            <div className="section" key={sectionIndex}>
              <div
                className="section-title"
                onClick={() => handleSectionClick(sectionIndex)}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                <strong>
                  {section.title} — {countChecked(sectionIndex)}/{section.lessons} lessons
                </strong>
              </div>

              {expandedSection === sectionIndex && (
                <>
                  <div className="lesson-list" style={{ marginTop: "10px" }}>
                    {[...Array(section.lessons)].map((_, lessonIndex) => (
                      <label
                        key={`${sectionIndex}-${lessonIndex}`}
                        className="lesson-radio"
                        style={{
                          display: "block",
                          marginBottom: "6px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name={`section-${sectionIndex}`}
                          checked={
                            selectedLessons[sectionIndex]?.has(lessonIndex) || false
                          }
                          onChange={() => toggleLesson(sectionIndex, lessonIndex)}
                          style={{ marginRight: "8px" }}
                        />
                        Lesson {lessonIndex + 1} ({section.lessonTimes[lessonIndex]})
                      </label>
                    ))}
                  </div>
                  <p style={{ marginTop: "8px", fontStyle: "italic" }}>
                    {section.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tabs section */}
       <div className="tabs">
        {Object.keys(tabContent).map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <div className="tab-content">{tabContent[activeTab]}</div>
      </div>
    </div>
  );
};

export default Courses;
