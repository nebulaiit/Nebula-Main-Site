import React, { useState } from 'react';
import ReplyInput from './ReplyInput';
import './ReplyThread.css'; // optional styling

export default function ReplyThread({ reply, postId, onReply, onReact }) {
    const reactionTypes = ['👍', '❤️', '🔥', '💡'];
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showNestedReplies, setShowNestedReplies] = useState(false);

    const replies = reply.replies || []; // ✅ fallback to empty array
    console.log(reply)

    return (
        <div className="reply-thread">
            <div className="reply-content">
                <p className='m-0'><strong>{reply.author}</strong> <span className="reply-time">· {reply.time}</span></p>
                <p className='m-0'>{reply.content}</p>

                <div className="reply-actions">
                    {reactionTypes.map((emoji) => (
                        <button key={emoji} onClick={() => onReact(postId, reply.id, emoji)} className="reaction-btn">
                            {emoji} {reply.reactions?.[emoji] || ''}
                        </button>
                    ))}
                    <button onClick={() => setShowReplyInput(!showReplyInput)} className="reply-btn">
                        💬 Reply
                    </button>
                    {replies.length > 0 && (
                        <button onClick={() => setShowNestedReplies(!showNestedReplies)} className="toggle-nested-btn">
                            {showNestedReplies ? '🔽 Hide' : `▶️ ${replies.length} replies`}
                        </button>
                    )}
                </div>

                {showReplyInput && (
                    <div className="nested-reply-input">
                        <ReplyInput onReply={(text, name) => {
                            onReply(postId, text, name, reply.id);
                            setShowReplyInput(false);
                        }} />
                    </div>
                )}

                {showNestedReplies && replies.length > 0 && (
                    <div className="nested-replies">
                        {replies.map((nestedReply) => (
                            <ReplyThread
                                key={nestedReply.id}
                                postId={postId}
                                reply={nestedReply}
                                onReply={onReply}
                                onReact={onReact}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
