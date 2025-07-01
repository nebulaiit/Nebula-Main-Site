import React, { useState } from 'react';
import './Community.css';


    const reactionTypes = ['👍', '❤️', '🔥', '💡'];

export default function Community() {
    const [post, setPost] = useState('');
    const [tags, setTags] = useState([]);
    const [activeTab, setActiveTab] = useState('Post');
    const [posts, setPosts] = useState([]);
    const [showTagModal, setShowTagModal] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [tagsList, setTagsList] = useState(['study-group', 'share-insight', 'help-question']);
    const [darkMode, setDarkMode] = useState(false);

    const handlePost = () => {
        if (!post.trim()) return alert('Write something before posting!');
        const newPost = {
            id: Date.now(),
            content: post,
            tags,
            reactions: {},
            replies: [],
        };
        setPosts([newPost, ...posts]);
        setPost('');
        setTags([]);
    };

    const toggleTag = (tag) => {
        setTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleReply = (postId, replyText, username = 'Anonymous', parentReplyId = null) => {
        if (!replyText.trim()) return;

        const newReply = {
            id: Date.now(),
            text: replyText,
            user: username,
            time: new Date().toLocaleString(),
            reactions: {},
            replies: [],
        };

        setPosts(posts.map(post => {
            if (post.id !== postId) return post;

            if (parentReplyId === null) {
                return { ...post, replies: [...post.replies, newReply] };
            }

            const addNestedReply = (replies) => {
                return replies.map(reply => {
                    if (reply.id === parentReplyId) {
                        return {
                            ...reply,
                            replies: [...reply.replies, newReply]
                        };
                    }
                    return {
                        ...reply,
                        replies: addNestedReply(reply.replies)
                    };
                });
            };

            return {
                ...post,
                replies: addNestedReply(post.replies)
            };
        }));
    };

    const handleReact = (postId, emoji) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? {
                    ...post,
                    reactions: {
                        ...post.reactions,
                        [emoji]: (post.reactions[emoji] || 0) + 1
                    }
                }
                : post
        ));
    };

    const handleReplyReact = (postId, replyId, emoji) => {
        const updateReplies = (replies) =>
            replies.map(reply =>
                reply.id === replyId
                    ? {
                        ...reply,
                        reactions: {
                            ...reply.reactions,
                            [emoji]: (reply.reactions[emoji] || 0) + 1
                        }
                    }
                    : {
                        ...reply,
                        replies: updateReplies(reply.replies)
                    }
            );

        setPosts(posts.map(post =>
            post.id === postId
                ? {
                    ...post,
                    replies: updateReplies(post.replies)
                }
                : post
        ));
    };





    return (
        <>
            <div className={`community-wrapper ${darkMode ? 'dark' : ''}`}>
                <div className="community-welcome">
                    <h1>
                        Welcome to the Community <span className="emoji">👋</span>, Shubham!
                    </h1>
                    <p>
                        You're in a space where <strong>ideas spark</strong>, <strong>questions get answered</strong>,
                        and <strong>creators grow together</strong>.
                    </p>
                    <p className="motto">
                        Let your voice be heard. Inspire. Ask. Share. <span className="emoji">🚀</span>
                    </p>
                </div>

                <div className="community-sections">
                    <div className="main-section">
                        <div className="post-box">
                            <div className="header-row">
                                <h2>📣 Community</h2>
                             
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
                                <button className="add-tag" onClick={() => setShowTagModal(true)}>+ Add Tags</button>
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
                            {posts.map((item) => (
                                <div className="discussion-card" key={item.id}>
                                    <p><strong>User post</strong></p>
                                    <p>{item.content}</p>
                                    <div className="meta">
                                        {item.tags.map((tag, i) => (
                                            <span key={i} className="meta-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="reaction-row">
                                        {reactionTypes.map((emoji) => (
                                            <button
                                                key={emoji}
                                                onClick={() => handleReact(item.id, emoji)}
                                                className="reaction-btn"
                                            >
                                                {emoji} {item.reactions[emoji] || ''}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="reply-section">
                                        <ReplyInput onReply={(reply, name) => handleReply(item.id, reply, name)} />
                                        <div className="replies">
                                            {item.replies.map((reply) => (
                                                <ReplyThread
                                                    key={reply.id}
                                                    postId={item.id}
                                                    reply={reply}
                                                    onReply={handleReply}
                                                    onReact={handleReplyReact}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
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
            </div>
            {showTagModal && (
                <div className="tag-modal-overlay">
                    <div className="tag-modal">
                        <h3>Add a New Tag</h3>
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Enter tag name (e.g. design-idea)"
                        />
                        <div className="modal-actions">
                            <button
                                className="modal-submit"
                                onClick={() => {
                                    const sanitizedTag = newTag.trim().toLowerCase().replace(/\s+/g, '-');
                                    if (sanitizedTag && !tagsList.includes(sanitizedTag)) {
                                        setTagsList([...tagsList, sanitizedTag]);
                                        setTags([...tags, sanitizedTag]);
                                        setNewTag('');
                                        setShowTagModal(false);
                                    } else {
                                        alert("Invalid or duplicate tag.");
                                    }
                                }}
                            >
                                Add Tag
                            </button>
                            <button className="modal-cancel" onClick={() => setShowTagModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="theme-toggle-container" onClick={() => setDarkMode(!darkMode)}>
                <div className={`theme-toggle ${darkMode ? "dark" : ""}`}>
                    <div className="toggle-label">
                        {darkMode ? "🌙" : "☀️"}
                    </div>
                </div>
            </div>

        </>
    );

}

function ReplyInput({ onReply }) {
    const [reply, setReply] = useState('');
    const [username, setUsername] = useState('');

    const handleReplySubmit = () => {
        onReply(reply, username || 'Anonymous');
        setReply('');
    };

    return (
        <div className="reply-input">
            <input
                type="text"
                placeholder="Your name (optional)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="username-input"
            />
            <input
                type="text"
                placeholder="Write a reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
            />
            <button onClick={handleReplySubmit}>Reply</button>
        </div>
    );
}

function ReplyThread({ reply, postId, onReply, onReact }) {
    const [showReplyInput, setShowReplyInput] = useState(false);

    return (
        <div className="reply">
            <strong>{reply.user}</strong> <span className="reply-time">({reply.time})</span>
            <p>{reply.text}</p>

            <div className="reaction-row">
                {reactionTypes.map((emoji) => (
                    <button
                        key={emoji}
                        onClick={() => onReact(postId, reply.id, emoji)}
                        className="reaction-btn"
                    >
                        {emoji} {reply.reactions[emoji] || ''}
                    </button>
                ))}
                <button className="reply-btn" onClick={() => setShowReplyInput(!showReplyInput)}>Reply</button>
            </div>

            {showReplyInput && (
                <ReplyInput
                    onReply={(text, name) => {
                        onReply(postId, text, name, reply.id);
                        setShowReplyInput(false);
                    }}
                />
            )}

            <div className="nested-replies">
                {reply.replies.map((nested) => (
                    <ReplyThread
                        key={nested.id}
                        reply={nested}
                        postId={postId}
                        onReply={onReply}
                        onReact={onReact}
                    />
                ))}
            </div>
        </div>
    );
}
