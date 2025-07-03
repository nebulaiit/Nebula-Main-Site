// JobDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './JobDetails.css';
import { getJobById } from '../../../APIService/apiservice';


const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const data = await getJobById(id);
                setJob(data);
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        };
        fetchJob();
    }, [id]);

    if (!job) return <div>Loading job details...</div>;

    return (

        <>
            <div className="job-details-wrapper">
                <div className="job-details-container">
                    <div className="job-details-header">
                        <img src={job.companyLogoUrl} alt={job.companyName} className="company-logo" />
                        <div className="job-title-section">
                            <h1>{job.jobTitle}</h1>
                            <p className="company-name">{job.companyName}</p>
                            <p className="location">{job.location} • {job.jobType} • {job.experience}</p>
                        </div>
                    </div>
                    <div className="info-grid">
                        <div className="info-card">
                            <h4><span className="icon">💰</span> Salary:</h4>
                            <p>₹10 LPA - ₹15 LPA</p>
                        </div>
                        <div className="info-card">
                            <h4><span className="icon">🎓</span> Education:</h4>
                            <p>B.Tech/B.E. in Computer Science or related field</p>
                        </div>
                        <div className="info-card">
                            <h4><span className="icon">🌐</span> Remote:</h4>
                            <p>Yes</p>
                        </div>
                        <div className="info-card">
                            <h4><span className="icon">📅</span> Posted On:</h4>
                            <p>2025-07-03</p>
                        </div>
                        <div className="info-card">
                            <h4><span className="icon">⏰</span> Last Date to Apply:</h4>
                            <p>2025-07-20</p>
                        </div>
                    </div>
                    <div className="section">
                        <h3>📝 Job Description</h3>
                        <p>{job.jobDescription}</p>
                    </div>
                    <div className="section">
                        <h3>🛠️ Responsibilities</h3>
                        <pre>{job.responsibilities}</pre>
                    </div>
                    <div className="section">
                        <h3>📋 Qualifications</h3>
                        <pre>{job.qualifications}</pre>
                    </div>
                    <div className="section">
                        <h3>🎁 Benefits</h3>
                        <pre>{job.benefits}</pre>
                    </div>
                    <div className="section">
                        <h3>🔧 Skills Required</h3>
                        <div className="skills-list">
                            {job.requiredSkills.map((skill, idx) => (
                                <span className="skill-badge" key={idx}>{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="apply-section">
                        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                            <button className="apply-btn">Apply Now</button>
                        </a>
                        <p>📧 {job.contactEmail} | 📞 {job.contactPhone}</p>
                    </div>
                </div>
                <div className="related-job-container">
                
                </div>
            </div>

        </>

    );
};

export default JobDetails;
