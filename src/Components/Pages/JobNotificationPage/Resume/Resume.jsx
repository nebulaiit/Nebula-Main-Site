import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Resume.css";
import { getAtsScore } from "../../../APIService/apiservice";

const ATSChecker = () => {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
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
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }


    try {
      const data = await getAtsScore(formData);
      setResult(data);
    } catch (error) {
      alert("⚠️ ATS check failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`ats-checker-container ${darkMode ? "dark" : ""}`}>
        <div className="right-container">
          <h2 className="ats-heading">Check Resume Against Job Role</h2>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
          <div className="ats-actions">
            <select onChange={(e) => setJobTitle(e.target.value)} value={jobTitle}>
              <option value="">Select Job Role</option>
              <option value="Java Developer">Java Developer</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="product Manager">Product Manager</option>
            </select>
            <button onClick={submitForATSCheck} disabled={loading}>
              {loading ? "Checking..." : "Check Resume"}
            </button>
          </div>
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
