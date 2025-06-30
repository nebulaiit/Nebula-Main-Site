import React, { useState } from 'react';
import './Community.css';

const tagsList = ['study-group', 'share-insight', 'help-question'];

export default function Community() {
    const [post, setPost] = useState('');
    const [tags, setTags] = useState([]);
    const [activeTab, setActiveTab] = useState('Post');

    const handlePost = () => {
        if (!post.trim()) return alert('Write something before posting!');
        console.log('Post submitted:', {
            content: post,})
        alert('Post submitted!');
        setPost('');
        setTags([]);
    };

    const toggleTag = (tag) => {
        setTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className="community-wrapper">
            <div className="main-section">
                <div className="post-box">
                    <div className="header-row">
                        <h2>📣 Community</h2>
                        <button className="close-btn">✕</button>
                    </div>
                    <textarea
                        placeholder="Hey everyone! 🎉 Share your thoughts..."
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                    ></textarea>
                    <div className="tag-bar">
                        {tagsList.map((tag) => (
                            <span
                                key={tag}
                                className={`tag ${tags.includes(tag) ? 'active' : ''}`}
                                onClick={() => toggleTag(tag)}
                            >
                                {tag}
                            </span>
                        ))}
                        <button className="add-tag">+ Add Tags</button>
                    </div>
                    <div className="tab-bar">
                        {['Post', 'Discussion', 'Resources', 'Announcements'].map((tab) => (
                            <button
                                key={tab}
                                className={activeTab === tab ? 'active' : ''}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                        <button className="submit-btn" onClick={handlePost}>Post</button>
                    </div>
                </div>

                <div className="discussion-feed">
                    <div className="discussion-card">
                        <p><strong>Title of the discussion will be placed here</strong></p>
                        <p>This proposal is a game-changer...</p>
                        <div className="meta">
                            <span className="meta-tag">study-group</span>
                            <span className="meta-tag">help-question</span>
                            <span className="meta-stats">💬 28 replies • 👁 875 views</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sidebar">
                <h4>🔥 Top Discussion This Week</h4>
                <ul className="side-links">
                    <li><a href="#">How do you stay focused?</a></li>
                    <li><a href="#">Share feedback on your assignment</a></li>
                    <li><a href="#">What books helped you most?</a></li>
                </ul>

                <h4>💡 Recommended Topics</h4>
                <div className="topic-tags">
                    {['Programming', 'Productivity', 'Machine Learning', 'Design'].map((tag) => (
                        <span className="topic-tag" key={tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
