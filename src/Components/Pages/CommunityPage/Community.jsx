import React, { useEffect, useState } from 'react';
import './Community.css';
import { getAllPosts } from '../../APIService/apiservice';
import { useDispatch, useSelector } from 'react-redux';
import ReplyInput from './Reply/ReplyInput';
import ReplyThread from './Reply/ReplyThread';
import { Filter } from 'bad-words';
import { showToast } from '../../../redux/toastSlice';



export default function Community() {

    const reactionTypes = ['👍', '❤️', '🔥', '💡'];
    const [post, setPost] = useState('');
    const [tags, setTags] = useState([]);
    const [posts, setPosts] = useState([]);
    const [tagsList, setTagsList] = useState(['study-group', 'share-insight', 'help-question']);
    const [showTagModal, setShowTagModal] = useState(false);
    const [newTag, setNewTag] = useState('');
    const darkMode = useSelector((state) => state.darkMode.enabled);
    const filter = new Filter();
    const dispatch = useDispatch();

    filter.addWords('sex', 'nude', 'porn', 'xxx', 'damn'); // add your custom blocklist here

    const handlePost = () => {
        if (!post.trim()) {
            return alert('Write something before posting!');
        }

        if (filter.isProfane(post)) {
            dispatch(showToast({ message: "⚠️ Avoid offensive language!", type: "error" }));
            return;
        }

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
        setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
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

    const handleReply = (postId, replyText, username = 'Anonymous', parentReplyId = null) => {
        if (!replyText.trim()) return;

        if (filter.isProfane(replyText)) {
            dispatch(showToast({ message: "⚠️ Avoid offensive language!", type: "error" }));
            return;
        }

        const newReply = {
            id: Date.now(),
            text: replyText,
            user: username,
            time: new Date().toLocaleString(),
            reactions: {},
            replies: [],
        };

        const updateReplies = (replies) => replies.map(reply =>
            reply.id === parentReplyId
                ? { ...reply, replies: [...reply.replies, newReply] }
                : { ...reply, replies: updateReplies(reply.replies) }
        );

        setPosts(posts.map(post =>
            post.id === postId
                ? {
                    ...post,
                    replies: parentReplyId ? updateReplies(post.replies) : [...post.replies, newReply]
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

    useEffect(() => {

        const fetchAllPost = async () => {
            try {

                const response = await getAllPosts();
                console.log("Fetched Posts:", response);
                setPosts(response);


            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };
        fetchAllPost();
    }, [])

    const user = useSelector((state) => state.user.user);

    const derivedUsername = (() => {
        if (user?.firstName && user?.lastName) {
            return `${user.firstName} ${user.lastName.charAt(0).toUpperCase()}.`;
        }
        if (user?.firstName) {
            return user.firstName;
        }
        if (user?.userName) {
            return user.userName;
        }
        if (user?.email) {
            return user.email.split('@')[0];
        }
        return 'Anonymous';
    })();



    return (
        <>
            <div className={`community-wrapper ${darkMode ? 'dark' : ''}`}>
                {/* Welcome Section */}
                <div className="community-welcome">
                    <h1>
                        Welcome to the Community <span className="emoji">👋</span>, {derivedUsername}!
                    </h1>
                    <p>
                        You're in a space where <strong>ideas spark</strong>, <strong>questions get answered</strong>,
                        and <strong>creators grow together</strong>.
                    </p>
                    <p className="motto">
                        Let your voice be heard. Inspire. Ask. Share. <span className="emoji">🚀</span>
                    </p>
                </div>

                {/* Community Content */}
                <div className="community-sections">
                    <div className="main-section">
                        {/* Post Box */}
                        <div className="post-box">
                            <div className="header-row">
                                <h2>📣 Community</h2>
                            </div>
                            <textarea
                                placeholder="Hey everyone! 🎉 Share your thoughts..."
                                value={post}
                                onChange={(e) => setPost(e.target.value)}
                            ></textarea>

                            {/* Tags */}
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

                                <button className="submit-btn" onClick={handlePost}>Post</button>
                            </div>

                            {/* Tabs & Post Button */}
                            {/* <div className="tab-bar">
                                {['Post', 'Discussion', 'Resources', 'Announcements'].map((tab) => (
                                    <button
                                        key={tab}
                                        className={activeTab === tab ? 'active' : ''}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div> */}
                        </div>

                        {/* Post Feed */}
                        <div className="discussion-feed">
                            {posts.map((item) => (
                                <div className="discussion-card" key={item.id}>
                                    <p><strong>{item.firstName} {item.lastName}</strong></p>
                                    <p>{item.content}</p>
                                    <div className="meta">
                                        {item.tags.map((tag, i) => (
                                            <span key={tag.id || i} className="meta-tag">{tag.name}</span>
                                        ))}
                                    </div>

                                    {/* Post Reactions */}
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


                                    {/* Reply Section */}
                                    {(item.replies.length > 0 || item.showReplyInput) && (
                                        <div className="reply-section">
                                            {item.showReplyInput && (
                                                <ReplyInput onReply={(reply, name) => handleReply(item.id, reply, name)} />
                                            )}
                                            {item.replies.length > 0 && item.showReplies && (
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
                                            )}
                                        </div>
                                    )}

                                    {/* Reply Toggle Button */}
                                    <div className="reply-toggle">
                                        <button
                                            className="reply-toggle-btn"
                                            onClick={() => {
                                                setPosts(posts.map(p =>
                                                    p.id === item.id
                                                        ? { ...p, showReplies: !p.showReplies, showReplyInput: true }
                                                        : p
                                                ));
                                            }}
                                        >
                                            💬 {item.replies.length > 0 ? `${item.replies.length} Replies` : 'Reply'}
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
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

            {/* Add Tag Modal */}
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
                                    const sanitized = newTag.trim().toLowerCase().replace(/\s+/g, '-');
                                    if (sanitized && !tagsList.includes(sanitized)) {
                                        setTagsList([...tagsList, sanitized]);
                                        setTags([...tags, sanitized]);
                                        setNewTag('');
                                        setShowTagModal(false);
                                    } else {
                                        alert("Invalid or duplicate tag.");
                                    }
                                }}
                            >
                                Add Tag
                            </button>
                            <button className="modal-cancel" onClick={() => setShowTagModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}





        </>
    );

}
