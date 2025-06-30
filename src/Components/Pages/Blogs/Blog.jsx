import React, { useEffect, useState } from 'react'
import './Blog.css';
import blogImg from '../../Images/blog/blog-img.png';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../Images/profile-icon.jpg';
import { getBlogList } from '../../APIService/apiservice';
import Slider from 'react-slick';

export default function Blog() {

    const navigate = useNavigate();

    const blogThumbnail = "https://blogger.googleusercontent.com/img/a/AVvXsEjvuwS9FlyUyPaq580F1th4KE9_X3VKaBRzEb2JHdymGPLow4U1okRHuSxtDdQdGZfBYoLz_rVJDKWyaB1whlPYhe59ALkm4TjUTJ9668-TsLFsdhJhsudmm2zY2azdvNVMbZOfOlCelfCv_m-JerPVO-hWC0ZJWrzQ-LZCRd8yrMkttnypFHg9IxQY=w382-h229-p-k-no-nu";

    const [blogList, setBlogList] = useState([]);

    useEffect(() => {

        const fetchBlogsList = async () => {
            try {

                const response = await getBlogList();
                setBlogList(response);
                console.log(response);

            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        fetchBlogsList();
    }, [])


    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


    return (
        <>
            <div className='blog-container'>
                <div className="outer-wrapper">
                    <div className="left-wrapper">
                        <h1 className='blog-heading'>Blog</h1>
                        <p className='blog-subheading'>Welcome to our blog! Here, we share insights, tips, and stories about programming, technology, and the latest trends in the industry. <br /> Stay tuned for regular updates! </p>
                    </div>
                    <div className="right-wrapper">
                        <img src={blogImg} alt="" />
                    </div>
                </div>

                <div className="blog-card-wrapper">
                    <h1>View the Most Recent Blogs.</h1>

                    <div className="blog-cards">

                        {blogList.map((blog) => (
                            <div className="blog-card-items" key={blog.id} onClick={() => navigate(`/blog-details/${blog.slug}`)}>
                                <img src={blog.image ? blog.image : blogThumbnail} alt={blog.blogTitle} />

                                <div className='user-details'>
                                    {/* <img src={blog.userImg ? blog.userImg : profileImg} alt={blog.author} /> */}
                                    <p>{formatDate(blog.createdAt)}</p>
                                    <h5>Post By : {blog.author}</h5>
                                </div>
                                <h5>{blog.blogTitle}</h5>
                            </div>
                        ))}

                    </div>

                </div>

                <div className="blog-cta-wrapper">
                    <blockquote className="blog-quote">
                        "The art of writing is the art of discovering what you believe." – Gustave Flaubert
                    </blockquote>
                    <button className="write-blog-btn" onClick={() => navigate('/write-blog')}>
                        ✍️ Write Your Blog
                    </button>
                </div>
            </div>
        </>
    )
}
