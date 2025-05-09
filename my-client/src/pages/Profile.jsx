import React, { useEffect, useState } from "react";
import VideoCard from "../components/reusableComponents/VideoCard";

export default function Profile() {
    const [userVideos, setUserVideos] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (user?._id || user?.id) {
            fetchUserVideos(user._id || user.id);
        }
    }, []);

    const fetchUserVideos = async (userId) => {
        try {
            const res = await fetch(`http://localhost:3000/assessment02/api/videos?user=${userId}`);
            const data = await res.json();

            if (res.ok) {
                setUserVideos(data.results || []);
            } else {
                console.error(data.error || "Failed to fetch videos");
            }
        } catch (err) {
            console.error("Failed to load user videos", err);
        }
    };

    const handleDelete = async (videoId) => {
        if (!window.confirm("Delete this video?")) return;
        try {
            const res = await fetch(`http://localhost:3000/assessment02/api/videos/${videoId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                setUserVideos((prev) => prev.filter((v) => v._id !== videoId));
                alert("✅ Video deleted!");
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete.");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">My Profile</h1>
                <p className="text-gray-600 mb-6">Welcome, {user?.username || "User"}!</p>

                <div className="bg-gray-100 p-4 rounded mb-8">
                    <p><strong>Username:</strong> {user?.username}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>User ID:</strong> {user?._id || user?.id}</p>
                </div>

                <h2 className="text-2xl font-semibold mb-4">My Uploaded Videos</h2>
                {userVideos.length === 0 ? (
                    <p className="text-gray-600">You haven’t uploaded any videos yet.</p>
                ) : (
                    userVideos.map((video) => (
                        <VideoCard
                            key={video._id}
                            video={video}
                            user={user}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
