import React, { useEffect, useState } from 'react'
import './BlogDetails.css'
import profileImage from '../../Images/profile-icon.jpg'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { getBlogDetails, getBlogList } from '../../APIService/apiservice';
import { useParams } from 'react-router-dom';
import ReactMarkdown from "react-markdown";


export default function BlogDetails() {

    const { slug } = useParams();

    const [blogDetails, setBlogDetails] = useState({});

    useEffect(() => {

        const fetchBlogsDetails = async () => {
            try {

                const response = await getBlogDetails(slug);
                setBlogDetails(response);
                console.log(response);

            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        fetchBlogsDetails();
    }, [])



    return (
        <>
            <div className="blog-details-wrapper">
                <div className="blog-detials-content-wrapper">
                    <div className="blog-content-container">
                        <h1>Understanding React Hooks</h1>
                        <div className="author-details">
                            <img src={profileImage} alt="" />
                            <div className='author-contact'>
                                <p><span>Author</span> - Prince Jha </p>
                                <p>June 1, 2025</p>
                            </div>
                        </div>
                        <div className="blog-details-img-wrapper">
                            <img src='https://blogger.googleusercontent.com/img/a/AVvXsEjvuwS9FlyUyPaq580F1th4KE9_X3VKaBRzEb2JHdymGPLow4U1okRHuSxtDdQdGZfBYoLz_rVJDKWyaB1whlPYhe59ALkm4TjUTJ9668-TsLFsdhJhsudmm2zY2azdvNVMbZOfOlCelfCv_m-JerPVO-hWC0ZJWrzQ-LZCRd8yrMkttnypFHg9IxQY=w382-h229-p-k-no-nu' alt="" />
                        </div>
                        <div className="blog-content">
                            <ReactMarkdown>{blogDetails.content}</ReactMarkdown>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="tag-wrapper">
                                <p className='tag-name'><LocalOfferOutlinedIcon /> Tags : </p>
                                <div className="tags-box">
                                    <p className='tags'>React</p>
                                    <p className='tags'>Hooks</p>
                                    <p className='tags'>JavaScript</p>
                                </div>
                            </div>
                            <div className="share-wrapper">
                                <ul className='list list-inline mb-0 d-flex align-items-center'>
                                    <li className='list-inline-item '>Share :</li>
                                    <li className='list-inline-item '><i className="fa-brands fa-facebook-f"></i></li>
                                    <li className='list-inline-item '><i className="fa-brands fa-whatsapp"></i></li>
                                    <li className='list-inline-item '><i className="fa-brands fa-twitter"></i></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="blog-user-comment-container">

                    </div>
                    <div className="blog-commentForm-container">

                    </div>


                </div>
                <div className="blog-detials-sidebar-wrapper">
                    <h2>Recent Blogs</h2>
                    <ul className='recent-blogs-list'>
                        <li className='recent-blog-item'>Understanding React Hooks</li>
                        <li className='recent-blog-item'>JavaScript ES6 Features</li>
                        <li className='recent-blog-item'>CSS Grid vs Flexbox</li>
                        <li className='recent-blog-item'>Building Responsive Websites</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
