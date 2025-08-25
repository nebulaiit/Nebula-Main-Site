import React, { useState} from 'react';
import './Blog.css';
import ReactImg from '../../Images/blog/ReactImg.png';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';

export default function Blog() {
    const navigate = useNavigate();
    const darkMode = useSelector((state) => state.darkMode.enabled);


    const featured = [
        { title: "React Coding Setup", image: ReactImg },
        { title: "React Coding Setup", image: WorkspaceImg },
        { title: "React Coding Setup", image: UiImg },

    ];

    var settings = {
        infinite: true,
        speed: 1000,              // Increased for a smooth fade
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,      // Slightly slower for better visual engagement
        cssEase: "ease-in-out",   // Smooth easing for transitions
        fade: true,               // Optional: for a fading transition between images
        arrows: false,            // Optional: hide arrows for clean design
        dots: false
    };

    const [blogs] = useState([
        {
            "id": "5567380f-76fe-4869-a355-009aea57b95f",
            "blogTitle": "Building Scalable Microservices with Spring Boot and Docker",
            "blogThumbnail": "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1470&q=80",
            "category": "Backend Engineering",
            "author": "Prince Jha",
            "slug": "building-scalable-microservices-with-spring-boot-and-docker",
            "createdAt": "2025-06-30T14:56:22.363868"
        },
        {
            "id": "65fed729-5842-4a2b-8c62-fe9bcfc0a305",
            "blogTitle": "Getting Started with OpenAI GPT: A Developer’s Perspective",
            "blogThumbnail": "https://images.unsplash.com/photo-1581090700227-1d30b8d87770?auto=format&fit=crop&w=1470&q=80",
            "category": "Artificial Intelligence",
            "author": "Shubham Musale",
            "slug": "getting-started-with-openai-gpt-a-developers-perspective",
            "createdAt": "2025-06-30T14:57:27.387809"
        },
        {
            "id": "67e52517-4842-49f3-96c2-041e73668f34",
            "blogTitle": "Understanding the Java Memory Model for High-Performance Applications",
            "blogThumbnail": "https://images.unsplash.com/photo-1581091215367-5c49a86a4656?auto=format&fit=crop&w=1470&q=80",
            "category": "Java",
            "author": "Shubham Musale",
            "slug": "understanding-the-java-memory-model-for-highperformance-applications",
            "createdAt": "2025-06-30T14:47:45.212962"
        },
        {
            "id": "74f674ad-df45-4fd6-932c-984a2b667abf",
            "blogTitle": "Top 10 Front-End Frameworks to Learn in 2025",
            "blogThumbnail": "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1470&q=80",
            "category": "Frontend Development",
            "author": "Neha Yadav",
            "slug": "top-10-front-end-frameworks-2025",
            "createdAt": "2025-06-28T12:35:00.000000"
        },
        {
            "id": "d4a8b90a-75b1-4c34-a355-88f8df3dfcd4",
            "blogTitle": "DevOps Best Practices for CI/CD in 2025",
            "blogThumbnail": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80",
            "category": "DevOps",
            "author": "Aman Raj",
            "slug": "devops-best-practices-ci-cd-2025",
            "createdAt": "2025-06-26T10:22:00.000000"
        },
        {
            "id": "4b07f3ef-bf95-4ad7-b865-00d919c2eaaa",
            "blogTitle": "Mastering Responsive Web Design with Tailwind CSS",
            "blogThumbnail": "https://images.unsplash.com/photo-1633356122048-bb2104b9b84b?auto=format&fit=crop&w=1470&q=80",
            "category": "UI/UX",
            "author": "Riya Kapoor",
            "slug": "responsive-web-design-tailwind-css",
            "createdAt": "2025-06-25T09:00:00.000000"
        },
        {
            "id": "f67b3270-7c72-4e9c-8725-4afcb2b50d2d",
            "blogTitle": "Intro to TypeScript for JavaScript Developers",
            "blogThumbnail": "https://images.unsplash.com/photo-1616331312867-e8fa84bff5ed?auto=format&fit=crop&w=1470&q=80",
            "category": "TypeScript",
            "author": "Rohit Nair",
            "slug": "intro-to-typescript",
            "createdAt": "2025-06-24T14:30:00.000000"
        },
        {
            "id": "b4e452f1-1370-4e3e-a6d1-2dd20c4307ed",
            "blogTitle": "State Management in React: Redux vs Context API",
            "blogThumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981d?auto=format&fit=crop&w=1470&q=80",
            "category": "React",
            "author": "Shivani Sharma",
            "slug": "react-redux-vs-context-api",
            "createdAt": "2025-06-23T11:00:00.000000"
        },
        {
            "id": "96a7f2cb-e160-4e58-b8b4-d85b728acb0e",
            "blogTitle": "Dark Mode Design Principles",
            "blogThumbnail": "https://images.unsplash.com/photo-1629121235213-b19c3eeaa308?auto=format&fit=crop&w=1470&q=80",
            "category": "Design",
            "author": "Tanya Verma",
            "slug": "dark-mode-design-principles",
            "createdAt": "2025-06-22T18:15:00.000000"
        }
    ]);


    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };



    return (
        <div className={`blog-container ${darkMode ? 'dark' : ''}`}>

            <div className="carousel-container">
                <Slider {...settings} >
                    {featured.map((image, index) => (
                        <div key={index} className="img-wrapper">
                            <img src={image.image} className="detail-image" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </Slider>
            </div>


            <div className="blog-card-wrapper">
                <h1>Featured Blogs</h1>
                <div className="horizontal-scroll">
                    {[
                        {
                            date: "May 30, 2025",
                            author: "Emma Carson",
                            title: "10 Simple Habits to Build a More Joyful Life",
                            image: "https://source.unsplash.com/300x200/?juice,healthy"
                        },
                        {
                            date: "June 10, 2025",
                            author: "Emma Carson",
                            title: "Avoiding Productivity Loss When Working Remotely",
                            image: "https://source.unsplash.com/300x200/?minimal,plant"
                        },
                        {
                            date: "May 30, 2025",
                            author: "Emma Carson",
                            title: "Centered and Strong: Survive the Overload",
                            image: "https://source.unsplash.com/300x200/?vase,table"
                        },
                        {
                            date: "May 30, 2025",
                            author: "Emma Carson",
                            title: "Finding Focus World: How to Stay Centered",
                            image: "https://source.unsplash.com/300x200/?bottle,focus"
                        }
                    ].map((post, index) => (
                        <div key={index} className="featured-card-horizontal">
                            <img src={post.image} alt={post.title} />
                            <div className="info">
                                <p className="meta">
                                    {post.date} <span>/</span> {post.author.toUpperCase()}
                                </p>
                                <h4>{post.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Blog Grid */}
            <div className="blog-card-wrapper">
                <h1>View the Most Recent Blogs.</h1>
                <div className="blog-cards">
                    {blogs.map((blog) => (
                        <div className="blog-card-items" key={blog.id} onClick={() => navigate(`/blog-details/${blog.slug}`)}>
                            <img src={blog.blogThumbnail} alt={blog.blogTitle} />
                            <div className='user-details'>
                                <p>{formatDate(blog.createdAt)}</p>
                                <h5>Post By : {blog.author}</h5>
                            </div>
                            <h5>{blog.blogTitle}</h5>
                        </div>
                    ))}
                </div>
            </div>
            {/* Blog Grid */}
            <div className="blog-card-wrapper">
                <h1>Popular Blog.</h1>
                <div className="blog-cards-grid">
                    {blogs.slice(0, 3).map((blog, index) => (
                        <div className={`blog-card  blog-card-${index + 1}`} key={blog.id} onClick={() => navigate(`/blog-details/${blog.slug}`)}>
                            <img src={blog.blogThumbnail} alt={blog.blogTitle} />
                            <div className="user-details">
                                <p>{formatDate(blog.createdAt)}</p>
                                <h5>Post By: {blog.author}</h5>
                            </div>
                            <h5>{blog.blogTitle}</h5>
                        </div>
                    ))}
                    <div className="blog-card blog-card-4">
                        <blockquote className="blog-quote">
                            "The art of writing is the art of discovering what you believe." – Gustave Flaubert
                        </blockquote>
                        <button className="floating-write-btn" onClick={() => navigate('/write-blog')}>
                            ✍️
                        </button>
                    </div>


                </div>

            </div>

            
        </div>
    );
}
