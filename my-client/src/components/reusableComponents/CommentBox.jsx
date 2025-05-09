import React, { useState } from "react";

export default function CommentBox({ postId, onSubmit }) {
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (!text.trim()) return;
        onSubmit(text);
        setText("");
    };

    return (
        <div className="mt-4">
            <textarea
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleSubmit}
            >
                Post Comment
            </button>
        </div>
    );
}
