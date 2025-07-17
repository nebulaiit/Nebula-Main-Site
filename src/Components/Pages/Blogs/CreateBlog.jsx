import React, { useState } from 'react';
import './CreateBlog.css';
import { addBlogs } from '../../APIService/apiservice';
import { useDispatch } from 'react-redux';
import { showToast } from '../../../redux/toastSlice';

export default function CreateBlog() {

    const dispatch = useDispatch();
    const [newBlog, setNewBlog] = useState({
        blogTitle: '',
        category: '',
        author: '',
        content: ''
    });

    const [blogThumbnail, setBlogThumbnail] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBlog(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const MAX_FILE_SIZE_MB = 2;

        if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            alert(`Image size should not exceed ${MAX_FILE_SIZE_MB}MB.`);
            e.target.value = '';
            return;
        }

        setBlogThumbnail(file);
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("blog", new Blob([JSON.stringify(newBlog)], { type: "application/json" }));
        formData.append("blogThumbnail", blogThumbnail);

        try {
            const response = await addBlogs(formData);

            dispatch(showToast({ message: "✅ Blog submitted successfully!", type: "success" }));

            // Optionally reset form
            setNewBlog({ blogTitle: '', category: '', author: '', content: '' });
            setBlogThumbnail(null);
        } catch (error) {
            console.error("Error submitting blog:", error);
            alert("❌ Something went wrong!");
        }
    };

    return (
        <div className="blog-form-wrapper">
            <h2 className="neon-title"> Create a New Blog</h2>
            <form onSubmit={handleBlogSubmit} className="blog-form">
                <div className='d-flex justify-content-between align-items-center'>
                    <input
                        type="text"
                        name="blogTitle"
                        value={newBlog.blogTitle}
                        onChange={handleInputChange}
                        placeholder="Blog Title"
                        required
                    />
                    <input
                        type="text"
                        name="author"
                        value={newBlog.author}
                        onChange={handleInputChange}
                        placeholder="Author"
                        required
                    />
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                    <input
                        type="file"
                        accept="image/*"
                        name="blogThumbnail"
                        onChange={handleFileChange}
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        value={newBlog.category}
                        onChange={handleInputChange}
                        placeholder="Category (e.g., Tech, Design)"
                        required
                    />
                </div>

                <textarea
                    name="content"
                    value={newBlog.content}
                    onChange={handleInputChange}
                    placeholder="Write your blog content here..."
                    rows="6"
                    required
                ></textarea>

                <button type="submit">🚀 Publish Blog</button>
            </form>
        </div>
    );
}
