import React, { useState } from 'react'
import ReplyInput from './ReplyInput';



export default function ReplyThread({ reply, postId, onReply, onReact }) {
    const reactionTypes = ['👍', '❤️', '🔥', '💡'];
    const [showReplyInput, setShowReplyInput] = useState(false);

    return (
        <>
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
                </div>

                 <ReplyInput
                        onReply={(text, name) => {
                            onReply(postId, text, name, reply.id);
                            setShowReplyInput(false);
                        }}
                    />


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
        </>
    )
}
