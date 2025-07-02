import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function ReplyInput({ onReply }) {

    const [reply, setReply] = useState('');
    const [visible, setVisible] = useState(false); // single boolean for per-instance control

    const toggleReplyInput = () => {
        setVisible((prev) => !prev);
    };

    const user = useSelector((state) => state.user.user);

    const derivedUsername = (() => {
        if (user?.firstName && user?.lastName) {
            return `${user.firstName} ${user.lastName.charAt(0).toUpperCase()}.`;
        }
        if (user?.firstName) return user.firstName;
        if (user?.userName) return user.userName;
        if (user?.email) return user.email.split('@')[0];
        return 'Anonymous';
    })();

    const handleReplySubmit = () => {
        if (reply.trim()) {
            onReply(reply, derivedUsername);
            setReply('');
            setVisible(false);
        }
    };
    return (
        <>
            <div className="reply-input">
                {!visible ? (
                    <button className="show-reply-btn" onClick={toggleReplyInput}>
                        Reply
                    </button>
                ) : (
                    <div className="reply-box">
                        <input
                            type="text"
                            placeholder="Write a reply..."
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                        />
                        <button className='me-3 mt-2' onClick={handleReplySubmit}>Reply</button>
                        <button onClick={toggleReplyInput}>Cancel</button>
                    </div>
                )}
            </div>
        </>
    )
}
