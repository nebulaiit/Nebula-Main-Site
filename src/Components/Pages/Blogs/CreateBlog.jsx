import React, { useState } from 'react'
import './CreateBlog.css';


export default function CreateBlog() {
    const [newBlog, setNewBlog] = useState({
        blogTitle: '',
        blogThumbnail: '',
        category: '',
        author: '',
        content: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBlog(prev => ({ ...prev, [name]: value }));
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/blogs/add-blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBlog)
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                setNewBlog({ blogTitle: '', blogThumbnail: '', category: '', author: '', content: '' });
            } else {
                alert(result.message || "Failed to submit blog.");
            }
        } catch (error) {
            console.error("Error submitting blog:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <>
            <div className="blog-form-wrapper">
                <h2>Add a New Blog</h2>
                <form onSubmit={handleBlogSubmit} className="blog-form">
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
                        name="blogThumbnail"
                        value={newBlog.blogThumbnail}
                        onChange={handleInputChange}
                        placeholder="Thumbnail URL"
                    />
                    <input
                        type="text"
                        name="category"
                        value={newBlog.category}
                        onChange={handleInputChange}
                        placeholder="Category"
                    />
                    <input
                        type="text"
                        name="author"
                        value={newBlog.author}
                        onChange={handleInputChange}
                        placeholder="Author"
                        required
                    />
                    <textarea
                        name="content"
                        value={newBlog.content}
                        onChange={handleInputChange}
                        placeholder="Blog Content"
                        rows="6"
                        required
                    ></textarea>
                    <button type="submit">Submit Blog</button>
                </form>
            </div>
        </>
    )
}
