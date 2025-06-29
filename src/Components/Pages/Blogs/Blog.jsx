import React from 'react'
import './Blog.css';
import blogImg from '../../Images/blog/blog-img.png';   
import { useNavigate } from 'react-router-dom';
import profileImg from '../../Images/profile-icon.jpg';

export default function Blog() {

const navigate = useNavigate();
const blogData = [
    { 
        id: 1,
        title: "Understanding React Hooks", 
        image: "https://blogger.googleusercontent.com/img/a/AVvXsEjvuwS9FlyUyPaq580F1th4KE9_X3VKaBRzEb2JHdymGPLow4U1okRHuSxtDdQdGZfBYoLz_rVJDKWyaB1whlPYhe59ALkm4TjUTJ9668-TsLFsdhJhsudmm2zY2azdvNVMbZOfOlCelfCv_m-JerPVO-hWC0ZJWrzQ-LZCRd8yrMkttnypFHg9IxQY=w382-h229-p-k-no-nu",
        userImg: profileImg ,
        userName: "Prince Jha",
    },
    
    { 
      id: 2, 
      title: "JavaScript ES6 Features",
      image: "https://blogger.googleusercontent.com/img/a/AVvXsEjvuwS9FlyUyPaq580F1th4KE9_X3VKaBRzEb2JHdymGPLow4U1okRHuSxtDdQdGZfBYoLz_rVJDKWyaB1whlPYhe59ALkm4TjUTJ9668-TsLFsdhJhsudmm2zY2azdvNVMbZOfOlCelfCv_m-JerPVO-hWC0ZJWrzQ-LZCRd8yrMkttnypFHg9IxQY=w382-h229-p-k-no-nu ",
      userImg: profileImg ,
      userName: "Prince Jha",
    },
    { 
        id: 3, 
        title: "CSS Grid vs Flexbox", 
        image: "https://blogger.googleusercontent.com/img/a/AVvXsEjvuwS9FlyUyPaq580F1th4KE9_X3VKaBRzEb2JHdymGPLow4U1okRHuSxtDdQdGZfBYoLz_rVJDKWyaB1whlPYhe59ALkm4TjUTJ9668-TsLFsdhJhsudmm2zY2azdvNVMbZOfOlCelfCv_m-JerPVO-hWC0ZJWrzQ-LZCRd8yrMkttnypFHg9IxQY=w382-h229-p-k-no-nu",
        userImg: profileImg ,
        userName: "Prince Jha",
    }

]
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
                  
                    {blogData.map((blog) => (
                        <div className="blog-card-items" key={blog.id} onClick={() => navigate(`/blog-details/${blog.title}`)}> 
                            <img src={blog.image || "https://via.placeholder.com/150"} alt={blog.title} />

                            <div className='user-details'>
                                <img src={blog.userImg} alt={blog.userName} />
                                <h5>{blog.userName}</h5>
                            </div>
                            <h5>{blog.title}</h5>           
                        </div>
                    ))}

                </div>
            </div>
        </div>
    </>
  )
}
