import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import './ApplyJob.css';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../../../redux/toastSlice';

const ApplyJob = () => {
  const darkMode = useSelector((state) => state.darkMode.enabled);
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("No file chosen");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    resume: null,
  });

   const [, setSubmitStatus] = useState(null);


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      const file = files[0];

      if (file && file.type !== "application/pdf") {
        alert("Please upload PDF files only.");
        setFileName("No file chosen");
        setFormData({ ...formData, resume: null });
        return;
      }

      setFormData({ ...formData, resume: file });
      setFileName(file ? file.name : "No file chosen");
      alert("");
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      alert('Resume is required (PDF only).');
      return;
    }

    try {

      // await axios.post(`/api/jobs/apply/${jobId}`, data, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // });
      console.log(formData);
      dispatch(showToast({ message: 'Successful Applied!', type: 'success' }));

      // setFormData({
      //   name: '',
      //   email: '',
      //   phone: '',
      //   coverLetter: '',
      //   resume: null,
      // });
    } catch  {
      setSubmitStatus(null);
      dispatch(showToast({ message: 'Error while Applying', type: 'error' }));

    }
  };

  return (
    <div className={`apply-job ${darkMode ? 'dark' : ''}`}>
      <h2 className="apply-job-title">Apply for Job</h2>
      <form onSubmit={handleSubmit} className="apply-job-form">
        <div className="apply-job-box">
          <div className="apply-job-field">
            <label className="apply-job-label">Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="apply-job-input" />
          </div>
          <div className="apply-job-field">
            <label className="apply-job-label">Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="apply-job-input" />
          </div>
        </div>

        <div className="apply-job-box">
          <div className="apply-job-field">
            <label className="apply-job-label">Phone *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="apply-job-input" />
          </div>
          <div className="apply-job-field">
            <label className="apply-job-label">Experience *</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleChange} required className="apply-job-input" />
          </div>
        </div>

        <div className="apply-job-box3">
          <div className="apply-job-field">
            <label className="apply-job-filelabel" htmlFor="resume-upload">Upload Resume (PDF only) *</label>
            <input type="file" name="resume" accept=".pdf" onChange={handleChange} required className="apply-job-input" id="resume-upload" />
            <span className="file-name">{fileName}</span>
          </div>
          <div className="apply-job-field">
            <label className="apply-job-label">Cover Letter (optional)</label>
            <textarea name="coverLetter" rows="4" value={formData.coverLetter} onChange={handleChange} className="apply-job-textarea"></textarea>
          </div>
        </div>

        <button type="submit" className="apply-job-submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;