import React from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom";


import Header from './Components/Pages/Header/Header';
import Home from './Components/Pages/Home/Home';

//compiler pages
import PythonCompiler from "./Components/CompilerPages/PythonCompiler";
import RCompiler from './Components/CompilerPages/RCompiler';
import SQLEditor from './Components/CompilerPages/SQLEditor';
import HTMLCSSEditor from './Components/CompilerPages/HTMLCSSEditor';
import JavaScriptCompiler from './Components/CompilerPages/JavaScriptCompiler';
import JavaCompiler from './Components/CompilerPages/JavaCompiler';
import CCompiler from './Components/CompilerPages/CCompiler';
import CppCompiler from './Components/CompilerPages/CppCompiler';
import CSharpCompiler from './Components/CompilerPages/CSharpCompiler';
import GoCompiler from './Components/CompilerPages/GoCompiler';
import PHPCompiler from './Components/CompilerPages/PHPCompiler';
import SwiftCompiler from './Components/CompilerPages/SwiftCompiler';
import RustCompiler from './Components/CompilerPages/RustCompiler';


import Login from './Components/Login/Login';
import CreateProject from './LearningPathPytho/CreateProject';
import Enrollment from './LearningPathPytho/Enrollment';
import PythonCourse from './Components/Pages/LearnNebula/PythonCourse';
import CourseList from './Components/Pages/LearnNebula/CourseList';
import Examples from './Components/Pages/TutorialHome/Examples';
import WebsiteFooter from './Components/Pages/WebsiteFooter/WebsiteFooter';
import JobNotificationPage from './Components/Pages/JobNotificationPage/JobNotificationPage';

// Examples page
import RubyExamples from './Components/Pages/TutorialHome/Ruby/RubyExamples';
import PythonExamples from './Components/Pages/TutorialHome/Python/PythonExamples';
import JavaScriptExamples from './Components/Pages/TutorialHome/JavaScript/JavaScriptExamples';
import JavaExamples from './Components/Pages/TutorialHome/Java/JavaExamples';
import HTMLExamples from './Components/Pages/TutorialHome/HTML/HTMLExamples';
import CSSExamples from './Components/Pages/TutorialHome/CSS/CSSExamples';
import SQLExamples from './Components/Pages/TutorialHome/SQL/SQLExamples';
import CExamples from './Components/Pages/TutorialHome/C/CExamples';
import CppExamples from './Components/Pages/TutorialHome/Cpp/CppExamples';
import CSharpExamples from './Components/Pages/TutorialHome/CSharp/CSharpExamples';
import SwiftExamples from './Components/Pages/TutorialHome/Swift/SwiftExamples';
import RustExamples from './Components/Pages/TutorialHome/Rust/RustExamples';
import DSAExamples from './Components/Pages/TutorialHome/DSA/DSAExamples';

//dashboard
import LearningDashboard from "./Components/Pages/LearningDashboard/LearningDashboard";
import ContactPage from './Components/Pages/ContactPage/ContactPage';
import TutorialPage from './Components/Pages/TutorialPage/TutorialPage';
import Premium from './Components/Pages/Premium/Premium';
import PaymentPage from './Components/Pages/PaymentPage/PaymentPage';
import ThankYou from './Components/Pages/thankyou/thankyou';


function App() {
  return (
    <BrowserRouter>
      <Header variant="default" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/course/:courseName" element={<PythonCourse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/try-now" element={<Enrollment />} />
        <Route path="/progamming/:courseName" element={<TutorialPage/>} />
        <Route path="/job-notification" element={<JobNotificationPage />} />
        <Route path="/course-premium" element={<Premium/>} />


        {/* Online Compilers */}
        <Route path="/compiler/Python" element={<PythonCompiler />} />
        <Route path="/compiler/:courseName" element={<RCompiler />} />
        <Route path="/compiler/Mysql" element={<SQLEditor />} />
        <Route path="/compiler/:courseName" element={<HTMLCSSEditor />} />
        <Route path="/compiler/:courseName" element={<JavaScriptCompiler />} />
        <Route path="/compiler/Java" element={<JavaCompiler />} />
        <Route path="/compiler/:courseName" element={<CCompiler />} />
        <Route path="/compiler/:courseName" element={<CppCompiler />} />
        <Route path="/compiler/:courseName" element={<CSharpCompiler />} />
        <Route path="/compiler/:courseName" element={<GoCompiler />} />
        <Route path="/compiler/:courseName" element={<PHPCompiler />} />
        <Route path="/compiler/:courseName" element={<SwiftCompiler />} />
        <Route path="/compiler/:courseName" element={<RustCompiler />} />

        {/* LanguageHeader Tabs */}
        <Route path="/examples" element={<Examples />} />
        <Route path="/course-list" element={<CourseList />} />


        {/* Examples Pages Routing */}
        <Route path="/tutorial/Ruby/RubyExamples" element={<RubyExamples />} />
        <Route path="/examples/:courseName" element={<PythonExamples />} />
        <Route path="/tutorial/JavaScript/JavaScriptExamples" element={<JavaScriptExamples />} />
        <Route path="/tutorial/Java/JavaExamples" element={<JavaExamples />} />
        <Route path="/tutorial/HTML/HTMLExamples" element={<HTMLExamples />} />
        <Route path="/tutorial/CSS/CSSExamples" element={<CSSExamples />} />
        <Route path="/tutorial/SQL/SQLExamples" element={<SQLExamples />} />
        <Route path="/tutorial/C/CExamples" element={<CExamples />} />
        <Route path="/tutorial/Cpp/CppExamples" element={<CppExamples />} />
        <Route path="/tutorial/CSharp/CSharpExamples" element={<CSharpExamples />} />
        <Route path="/tutorial/Swift/SwiftExamples" element={<SwiftExamples />} />
        <Route path="/tutorial/Rust/RustExamples" element={<RustExamples />} />
        <Route path="/tutorial/DSA/DSAExamples" element={<DSAExamples />} />
        <Route path="/learning-dashboard" element={<LearningDashboard />} />
        <Route path="/paymentPage" element={<PaymentPage />} />
        <Route path="/thankyou" element={<ThankYou />} />
 

      </Routes>
      <WebsiteFooter />
    </BrowserRouter>
  );
}

export default App;


