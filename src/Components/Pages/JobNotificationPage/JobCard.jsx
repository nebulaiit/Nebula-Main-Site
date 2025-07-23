import React, { useEffect, useState } from 'react';
import './JobCard.css';
import { useNavigate } from 'react-router-dom';
import { getJobList } from '../../APIService/apiservice';

const JobCard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobList = async () => {
            try {
                const data = await getJobList();
                console.log(data);
                setJobs(data);
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        };
        fetchJobList();
    }, []);

    if (!jobs || jobs.length === 0) return <div>Loading job listings...</div>;

    return (
        <>
            {jobs.map((job) => (
                <div className="job-card" key={job.id}>
                    <h2>{job.jobTitle}</h2>
                    <p className="company">{job.companyName}</p>
                    <p className="location">{job.location}</p>
                    <p>{job.jobType}</p>
                    <p>{job.experience}</p>
                    <p className="salary">💰 {job.salaryRange}</p>
                    <div className="job-footer">
                        <span>📅 Posted: {job.postedDate}</span>
                    </div>

                    <button className="view-btn" onClick={() => navigate(`/job-details/${job.id}`)}>
                        View Now
                    </button>
                </div>
            ))}
        </>
    );
};

export default JobCard;
