import React, { useEffect, useState } from 'react';
import './JobCard.css';
import { useNavigate } from 'react-router-dom';
import { getJobList } from '../../APIService/apiservice';
import { useSelector } from 'react-redux';


const dummyJobs = [
    {
        id: 1,
        jobTitle: "Frontend Developer",
        companyName: "Nebula Technologies",
        location: "Pune, Maharashtra",
        jobType: "Full-time",
        experience: "1-3 years",
        salaryRange: "₹6 LPA - ₹10 LPA",
        postedDate: "2025-08-01"
    },
    {
        id: 2,
        jobTitle: "Backend Developer",
        companyName: "SkyNet Solutions",
        location: "Bangalore, Karnataka",
        jobType: "Remote",
        experience: "2-5 years",
        salaryRange: "₹10 LPA - ₹14 LPA",
        postedDate: "2025-07-30"
    },
    {
        id: 3,
        jobTitle: "UI/UX Designer",
        companyName: "PixelCraft",
        location: "Hyderabad, Telangana",
        jobType: "Part-time",
        experience: "0-2 years",
        salaryRange: "₹4 LPA - ₹6 LPA",
        postedDate: "2025-07-28"
    },
    {
        id: 4,
        jobTitle: "Full Stack Developer",
        companyName: "CodeOrbit",
        location: "Remote",
        jobType: "Contract",
        experience: "3-6 years",
        salaryRange: "₹12 LPA - ₹18 LPA",
        postedDate: "2025-08-02"
    },
    {
        id: 5,
        jobTitle: "Digital Marketing Executive",
        companyName: "BrandLabs",
        location: "Mumbai, Maharashtra",
        jobType: "Full-time",
        experience: "1-3 years",
        salaryRange: "₹5 LPA - ₹8 LPA",
        postedDate: "2025-08-03"
    },
];

const JobCard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState(dummyJobs);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        location: '',
        jobType: '',
        experience: '',
        salary: '',
    });

    const darkMode = useSelector((state) => state.darkMode.enabled);

    useEffect(() => {
        const fetchJobList = async () => {
            try {
                const data = await getJobList();
                console.log(data);
                // setJobs(data);
                // setFilteredJobs(data);
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        };
        fetchJobList();
    }, []);

    useEffect(() => {
        const filtered = jobs.filter((job) => {
            return (
                job.jobTitle.toLowerCase().includes(search.toLowerCase()) &&
                (filters.location ? job.location === filters.location : true) &&
                (filters.jobType ? job.jobType === filters.jobType : true) &&
                (filters.experience ? job.experience === filters.experience : true) &&
                (filters.salary ? parseInt(job.salaryRange) >= parseInt(filters.salary) : true)
            );
        });
        setFilteredJobs(filtered);
    }, [search, filters, jobs]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    if (!jobs || jobs.length === 0) return <div>Loading job listings...</div>;

    return (
        <>
            <div className={`job-card-wrapper ${darkMode ? 'dark' : ''}`}>
                <div className={`job-filters `}>
                    <input
                        type="text"
                        placeholder="Search by job title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select name="location" onChange={handleFilterChange} value={filters.location}>
                        <option value="">All Locations</option>
                        {[...new Set(jobs.map(job => job.location))].map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                    <select name="jobType" onChange={handleFilterChange} value={filters.jobType}>
                        <option value="">All Job Types</option>
                        {[...new Set(jobs.map(job => job.jobType))].map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <select name="experience" onChange={handleFilterChange} value={filters.experience}>
                        <option value="">All Experience Levels</option>
                        {[...new Set(jobs.map(job => job.experience))].map((exp) => (
                            <option key={exp} value={exp}>{exp}</option>
                        ))}
                    </select>
                    <select name="salary" onChange={handleFilterChange} value={filters.salary || ""}>
                        <option value="">Min Salary</option>
                        {[...new Set(
                            jobs
                                .map(job => parseInt(job.salaryRange))
                                .filter(sal => !isNaN(sal))   // ✅ remove NaN values
                                .sort((a, b) => a - b)
                        )].map((sal) => (
                            <option key={sal} value={sal}>
                                {`₹${sal}+`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="job-card-container">
                    {filteredJobs.length === 0 ? (
                        <p>No jobs found for the selected filters.</p>
                    ) : (
                        filteredJobs.map((job) => (
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
                        ))
                    )}
                </div>

            </div>
        </>
    );
};

export default JobCard;
