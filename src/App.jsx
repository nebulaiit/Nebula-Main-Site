import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Pages/Header/Header';
import Home from './Components/Pages/Home/Home';



import Login from './Components/Login/Login';
import CreateProject from './LearningPathPytho/CreateProject';
import Enrollment from './LearningPathPytho/Enrollment';
import PythonCourse from './Components/Pages/LearnNebula/PythonCourse';
import CourseList from './Components/Pages/LearnNebula/CourseList';
import WebsiteFooter from './Components/Pages/WebsiteFooter/WebsiteFooter';
import JobNotificationPage from './Components/Pages/JobNotificationPage/JobNotificationPage';

import PythonExamples from './Components/Pages/TutorialHome/Python/PythonExamples';

//dashboard
import LearningDashboard from "./Components/Pages/LearningDashboard/LearningDashboard";
import ContactPage from './Components/Pages/ContactPage/ContactPage';
import TutorialPage from './Components/Pages/TutorialPage/TutorialPage';
import Premium from './Components/Pages/Premium/Premium';
import PaymentPage from './Components/Pages/PaymentPage/PaymentPage';
import ThankYou from './Components/Pages/thankyou/thankyou';
import Courses from './Components/Pages/CoursePlaySection/Courses';
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

function App() {
  // useEffect(() => {
  //   // document.body.style.backgroundImage = `url("/bi5.jpg")`; // Set your universal background image path
  //   document.body.style.backgroundSize = "cover";
  //   document.body.style.backgroundRepeat = "no-repeat";
  //   document.body.style.backgroundPosition = "center center";
  //   document.body.style.backgroundAttachment = "fixed";
  // }, []);

  const darkMode = useSelector((state) => state.darkMode.enabled);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);



  return (


    <BrowserRouter>
      <Header variant="default" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/tutorial' element={<CourseList />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/course/:courseName" element={<PythonCourse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/learning-path/:index" element={<Enrollment />} />
        <Route path="/progamming/:courseName" element={<TutorialPage />} />
        <Route path="/career" element={<JobNotificationPage />} />
        <Route path="/course-List/:courseName" element={<Premium />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog-details/:slug' element={<BlogDetails />} />
        <Route path='/write-blog' element={<CreateBlog />} />
        <Route path='/community' element={<Community />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/course-list" element={<CourseListPage />} />
        <Route path="/examples/:courseName" element={<PythonExamples />} />
        <Route path="/learning-dashboard" element={<LearningDashboard />} />
        <Route path="/paymentPage" element={<PaymentPage />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/resume-checker" element={<ATSChecker />} />
        <Route path="/create-resume" element={<CreateResume />} />
        <Route path="/forgot-password" element={<ForgotFlow />} />


      </Routes>

      <ToastList />
      <DarkMode />
      <WebsiteFooter />


    </BrowserRouter>
  );
}

export default App;