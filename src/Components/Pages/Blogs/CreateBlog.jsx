import React, { useState } from 'react';
import './CreateBlog.css';
import { addBlogs } from '../../APIService/apiservice';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../../redux/toastSlice';
import LazyImage from '../../LazyImage';

export default function CreateBlog() {

    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.darkMode.enabled);

    const [newBlog, setNewBlog] = useState({
        blogTitle: '',
        category: '',
        author: '',
        content: ''
    });

    const [blogThumbnail, setBlogThumbnail] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

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
        setPreviewUrl(file ? URL.createObjectURL(file) : null);
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append(
            "blog",
            new Blob([JSON.stringify(newBlog)], { type: "application/json" })
        );
        formData.append("blogThumbnail", blogThumbnail);

        try {
            const response = await addBlogs(formData);

            if (response.status === 200) {
                dispatch(
                    showToast({ message: "✅ Blog submitted successfully!", type: "success" })
                );

                // Reset form
                setNewBlog({ blogTitle: "", category: "", author: "", content: "" });
                setBlogThumbnail(null);
                setPreviewUrl(null);
            } else {
                dispatch(
                    showToast({
                        message: `⚠️ Blog submission failed! (Status: ${response.status})`,
                        type: "error",
                    })
                );
            }
        } catch (error) {
            console.error("Error submitting blog:", error);
            dispatch(
                showToast({
                    message: "❌ Something went wrong while submitting the blog!",
                    type: "error",
                })
            );
        }
    };

    return (
        <div className={`blog-form-wrapper ${darkMode ? 'dark' : ''}`}>
            <h2 className="neon-title"> Create a New Blog</h2>
            <form onSubmit={handleBlogSubmit} className="blog-form">
                <div className='blog-input-items'>
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

                <div className='blog-input-items'>
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

                {previewUrl && (
                    <div className="blog-thumbnail-preview">
                        <LazyImage src={previewUrl} alt="Blog Thumbnail Preview" style={{ maxWidth: '200px', borderRadius: '10px', margin: '10px 0' }} />
                    </div>
                )}

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