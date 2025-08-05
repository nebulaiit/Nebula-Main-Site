// JobDetails.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './JobDetails.css';
import { getJobById } from '../../../APIService/apiservice';
import { useSelector } from 'react-redux';

const dummyJob = {
    id: "1",
    companyLogoUrl: "https://via.placeholder.com/80x80.png?text=Logo",
    companyName: "Nebula Tech Pvt. Ltd.",
    jobTitle: "Full Stack Web Developer",
    location: "Pune, India",
    jobType: "Full-time",
    experience: "2-4 years",
    salaryRange: "₹10 LPA - ₹15 LPA",
    education: "B.Tech/B.E. in Computer Science or related field",
    remote: true,
    postedDate: "2025-07-03",
    lastDateToApply: "2025-07-20",
    jobDescription:
        "We are looking for a Full Stack Web Developer to build and maintain high-quality web applications. You will work closely with design and product teams to deliver user-friendly experiences.",
    responsibilities: `- Develop frontend interfaces using React.js\n- Implement backend services using Spring Boot\n- Integrate RESTful APIs\n- Write clean and maintainable code\n- Participate in code reviews`,
    qualifications: `- Bachelor's degree in Computer Science or related field\n- 2+ years of experience in web development\n- Strong problem-solving skills`,
    benefits: `- Remote work flexibility\n- Health insurance\n- Paid time off\n- Professional development opportunities`,
    requiredSkills: ["Java", "Spring Boot", "React.js", "REST APIs", "MySQL", "Git"],
    contactEmail: "hr@nebula-tech.com",
    contactPhone: "+91-9876543210"
};


const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(dummyJob);
    const darkMode = useSelector((state) => state.darkMode.enabled);
    const navigate = useNavigate();


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

    const handleApply = (id)=>{
        navigate(`/apply/${id}`);
    }

    if (!job) return <div>Loading job details...</div>;

    return (

        <>
            <div className={`job-details-wrapper ${darkMode ? 'dark' : ''}`}>
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
                        <div className="job-info-card">
                            <h4><span className="icon">💰</span> Salary:</h4>
                            <p>₹10 LPA - ₹15 LPA</p>
                        </div>
                        <div className="job-info-card">
                            <h4><span className="icon">🎓</span> Education:</h4>
                            <p>B.Tech/B.E. in Computer Science or related field</p>
                        </div>
                        <div className="job-info-card">
                            <h4><span className="icon">🌐</span> Remote:</h4>
                            <p>Yes</p>
                        </div>
                        <div className="job-info-card">
                            <h4><span className="icon">📅</span> Posted On:</h4>
                            <p>2025-07-03</p>
                        </div>
                        <div className="job-info-card">
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
                        <button className="apply-btn" onClick={()=>{handleApply(job.id)}}>Apply Now</button>
                        <p>📧 {job.contactEmail} | 📞 {job.contactPhone}</p>
                    </div>
                </div>

            </div>

        </>

    );
};

export default JobDetails;
