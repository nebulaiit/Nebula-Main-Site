import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ApplyJob.css';

const ApplyJob = () => {
  const { jobId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    resume: null,
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      const file = files[0];
      if (file && file.type !== 'application/pdf') {
        setError('Please upload PDF files only.');
        return;
      }
      setFormData({ ...formData, resume: file });
      setError('');
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      setError('Resume is required (PDF only).');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('coverLetter', formData.coverLetter);
      data.append('resume', formData.resume);

      await axios.post(`/api/jobs/apply/${jobId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSubmitStatus('Application submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null,
      });
    } catch (err) {
      setSubmitStatus(null);
      setError('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="apply-job">
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
              <input type="text" name="experience" value={formData.phone} onChange={handleChange} required className="apply-job-input" />
            </div>
        </div>

        <div className="apply-job-box3">
            <div className="apply-job-field">
              <label className="apply-job-label">Resume (PDF only) *</label>
              <input type="file" name="resume" accept=".pdf" onChange={handleChange} required className="apply-job-input" />
            </div>
            <div className="apply-job-field">
              <label className="apply-job-label">Cover Letter (optional)</label>
              <textarea name="coverLetter" rows="4" value={formData.coverLetter} onChange={handleChange} className="apply-job-textarea"></textarea>
            </div>
        </div>

        {error && <div className="apply-job-error">{error}</div>}
        {submitStatus && <div className="apply-job-success">{submitStatus}</div>}

        <button type="submit" className="apply-job-submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;