import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Login/Login';
import Enrollment from './LearningPathPytho/Enrollment';
import PythonCourse from './Components/Pages/LearnNebula/PythonCourse';
import CourseList from './Components/Pages/LearnNebula/CourseList';
import WebsiteFooter from './Components/WebsiteFooter/WebsiteFooter';
import JobNotificationPage from './Components/Pages/JobNotificationPage/JobNotificationPage';
import LearningDashboard from "./Components/Pages/LearningDashboard/LearningDashboard";
import ContactPage from './Components/Pages/ContactPage/ContactPage';
import TutorialPage from './Components/Pages/TutorialPage/TutorialPage';
import Premium from './Components/Pages/Premium/Premium';
import ThankYou from './Components/Pages/thankyou/thankyou';
import Blog from './Components/Pages/Blogs/Blog';
import BlogDetails from './Components/Pages/Blogs/BlogDetails';
import CreateBlog from './Components/Pages/Blogs/CreateBlog';
import Community from './Components/Pages/CommunityPage/Community';
import JobDetails from './Components/Pages/JobNotificationPage/JobDetailsPage/JobDetails';
import ToastList from './Components/Toast/ToastList';
import CreateResume from './Components/Pages/JobNotificationPage/Resume/CreateResume/CreateResume';
import ATSChecker from './Components/Pages/JobNotificationPage/Resume/Resume';
import ForgotFlow from './Components/Login/ForgotFlow';
import CourseListPage from './Components/Pages/Courses/CourseListPage';
import DarkMode from './Components/DarkMode/DarkMode';
import { useSelector } from 'react-redux';
import ApplyJob from './Components/Pages/JobNotificationPage/ApplyJob/ApplyJob';
import ComingSoon from './Components/ComingSoon/ComingSoon';
import CoursesPlay from './Components/Pages/CoursePlaySection/CoursesPlay';

function App() {


  const darkMode = useSelector((state) => state.darkMode.enabled);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);



  return (


    <BrowserRouter>
      <Header variant="default" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotFlow />} />
        <Route path="/thankyou" element={<ThankYou />} />

        <Route path="/examples/:courseName" element={<ComingSoon />} />
        <Route path="/compiler/:courseName" element={<ComingSoon />} />

        {/* Tutorial Pages */}
        <Route path='/tutorial' element={<CourseList />} />
        <Route path="/course/:courseName" element={<PythonCourse />} />
        <Route path="/progamming/:courseName" element={<TutorialPage />} />

        {/* Course Pages */}
        <Route path="/course-list" element={<CourseListPage />} />
        <Route path="/learning-path/:id" element={<Enrollment />} />
        <Route path="/course-List/:courseName" element={<Premium />} />
        <Route path="/courses" element={<CoursesPlay />} />

        {/* blogs Paths */}
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog-details/:slug' element={<BlogDetails />} />
        <Route path='/write-blog' element={<CreateBlog />} />

        {/* Community Page */}
        <Route path='/community' element={<Community />} />

        {/* Job pages */}
        <Route path="/career" element={<JobNotificationPage />} /> 
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/resume-checker" element={<ATSChecker />} />
        <Route path="/create-resume" element={<CreateResume />} />
        <Route path="/apply/:jobId" element={<ApplyJob />} />

        {/* User Dashboard */}
        <Route path="/learning-dashboard" element={<LearningDashboard />} />

      </Routes>

      <ToastList />
      <DarkMode />
      <WebsiteFooter />


    </BrowserRouter>
  );
}

export default App;