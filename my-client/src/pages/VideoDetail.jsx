import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [video, setVideo] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchVideo() {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/videos/${id}`);
                const data = await res.json();
                setVideo(data);
                setComments(data.comments || []);
            } catch (err) {
                console.error("Failed to load video", err);
                navigate("/videos");
            }
        }

        fetchVideo();
    }, [id, navigate]);

    const isUploader = user && video?.user?._id === user._id;

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this video?")) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/videos/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (res.ok) {
                alert("Video deleted successfully");
                navigate("/videos");
            } else {
                alert(data.error || "Failed to delete video");
            }
        } catch (err) {
            console.error("Error deleting video:", err);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!token || !user) {
            alert("You must be logged in to comment.");
            return;
        }

        const newComment = {
            text: commentText,
            video: id,
            user: user._id,
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/videos/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newComment),
            });

            const data = await res.json();
            if (res.ok) {
                setComments([...comments, data]);
                setCommentText("");
            } else {
                alert(data.msg || "Failed to add comment");
            }
        } catch (err) {
            console.error("Comment error:", err);
        }
    };

    if (!video) return <div className="p-6">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
            <p className="text-sm text-gray-400 mb-2">
                Uploaded by: {video.user?.username || "Unknown"} on{" "}
                {new Date(video.uploadedAt).toLocaleString()}
            </p>
            <p className="text-lg text-gray-700 whitespace-pre-wrap mb-6">
                {video.description || "No description."}
            </p>
            <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline mb-6 block"
            >
                Watch Video
            </a>

            {isUploader && (
                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-6"
                >
                    Delete Video
                </button>
            )}

            {/* Comment Box */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Leave a Comment</h2>
                <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write your comment..."
                        rows={3}
                        required
                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="self-end bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        Post Comment
                    </button>
                </form>
            </div>

            {/* Comment List */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                {comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet.</p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="bg-white p-4 mb-3 rounded shadow text-gray-800"
                        >
                            <p>{comment.text}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                By: {comment.user?.username || "Anonymous"}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
