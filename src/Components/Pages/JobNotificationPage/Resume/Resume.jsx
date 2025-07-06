import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // use this for page navigation
import "./Resume.css";

const ATSChecker = () => {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const submitForATSCheck = async () => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobTitle", jobTitle);

    const res = await fetch("http://localhost:8080/api/ats-check", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  const goToResumeCreator = () => {
    navigate("/create-resume");
  };

  return (
    <div className="ats-checker-container">
      <h2 className="ats-heading">Check Resume Against Job Role</h2>

      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
      <div className="ats-actions">
        <select onChange={(e) => setJobTitle(e.target.value)} value={jobTitle}>
          <option value="">Select Job Role</option>
          <option value="software engineer">Software Engineer</option>
          <option value="data analyst">Data Analyst</option>
          <option value="product manager">Product Manager</option>
        </select>
        <button onClick={submitForATSCheck}>Check Resume</button>
      </div>

      <div className="or-separator">or</div>

      <button className="create-resume-btn" onClick={goToResumeCreator}>
        I Don’t Have a Resume → Create One
      </button>

      {result && (
        <div className="ats-result">
          <h3>Score: {result.score}/100</h3>
          <p>{result.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default ATSChecker;
