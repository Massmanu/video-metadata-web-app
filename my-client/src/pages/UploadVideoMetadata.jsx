import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadVideoMetadata() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    console.log(token)

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim().length < 3) {
            alert("Title must be at least 3 characters.");
            return;
        }

        if (url.trim().length < 10 || !url.startsWith("http")) {
            alert("Please enter a valid video URL.");
            return;
        }

        if (!user || !token) {
            alert("You must be logged in to upload a video.");
            return;
        }

        const videoData = {
            title,
            description,
            url,
        };

        try {

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/videos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(videoData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("✅ Video metadata uploaded successfully!");
                navigate("/videos");
            } else {
                alert(`❌ Error: ${data.error || "Failed to upload video metadata"}`);
            }
        } catch (err) {
            console.error("Error uploading video metadata:", err);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Upload Video Metadata</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter video title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Write a short description..."
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                        <input
                            type="url"
                            name="url"
                            required
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="https://example.com/video.mp4"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white font-medium py-2 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Upload Video
                    </button>
                </form>
            </div>
        </div>
    );
}
