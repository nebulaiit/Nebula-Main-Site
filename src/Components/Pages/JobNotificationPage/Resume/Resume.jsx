import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Resume.css";
import { useSelector } from "react-redux";

const ATSChecker = () => {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const darkMode = useSelector((state) => state.darkMode.enabled);    


  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const submitForATSCheck = async () => {
    if (!file || !jobTitle) {
      alert("Please upload a resume and select a job role.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobTitle", jobTitle);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/ats-score", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get ATS score.");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while checking your resume.");
    } finally {
      setLoading(false);
    }
  };

  const goToResumeCreator = () => {
    navigate("/create-resume");
  };

  return (
    <>

      <div className={`ats-checker-container ${darkMode ? 'dark' : ''}`}>
        <div className="left-container">
          <h2>“Turn your skills into opportunities — one resume at a time.</h2>
          <button className="create-resume-btn" onClick={goToResumeCreator}>
            I Don’t Have a Resume → Create One
          </button>
        </div>
        <div className="right-container">
          <h2 className="ats-heading">Check Resume Against Job Role</h2>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
          <div className="ats-actions">
            <select onChange={(e) => setJobTitle(e.target.value)} value={jobTitle}>
              <option value="">Select Job Role</option>
              <option value="software engineer">Java Developer</option>
              <option value="data analyst">Data Analyst</option>
              <option value="product manager">Product Manager</option>
            </select>
            <button onClick={submitForATSCheck} disabled={loading}>
              {loading ? "Checking..." : "Check Resume"}
            </button>
          </div>
          <div className="or-separator">or</div>

        </div>

      </div>
      {result && (
        <div className="ats-result">
          <h3>Score: {result.score}/100</h3>
          <p>{result.feedback}</p>
        </div>
      )}
    </>
  );
};

export default ATSChecker;
