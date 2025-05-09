// src/controllers/videoController.js
const Video = require('../models/Video');
const Comment = require('../models/Comment');

// src/controllers/videoController.js
exports.getAllVideos = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'uploadedAt',
            sortOrder = 'desc',
            search,
            ...filters
        } = req.query;

        // Build the Mongo filter object
        const queryObj = { ...filters };

        // If there's a search term, match it (case-insensitive) against title or description
        if (search) {
            queryObj.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        const videos = await Video.find(queryObj)
            .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .populate('user', 'username email')
            .populate('comments');

        const totalCount = await Video.countDocuments(queryObj);

        return res.json({
            results: videos,
            totalCount,
            currentPage: pageNum,
            totalPages: Math.ceil(totalCount / limitNum),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve videos.' });
    }
};

exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
            .populate('user', 'username email')
            .populate({
                path: 'comments',
                populate: { path: 'user', select: 'username email' }  // also populate user of each comment
            });
        if (!video) {
            return res.status(404).json({ error: "Video not found." });
        }
        res.json(video);
    } catch (err) {
        res.status(500).json({ error: "Error fetching video." });
    }
};

exports.createVideo = async (req, res) => {
    try {
        const { title, description, url } = req.body;

        if (!title || !url) {
            return res.status(400).json({ error: 'Title and URL are required.' });
        }

        // Make sure the user is authenticated
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: 'Unauthorized. User ID missing.' });
        }

        const newVideo = new Video({
            title,
            description,
            url,
            user: req.user.userId,
        });

        await newVideo.save();
        res.status(201).json({ message: 'Video metadata saved', video: newVideo });
    } catch (err) {
        console.error('Error saving video:', err);
        res.status(500).json({ error: 'Server error while saving video metadata' });
    }
};



exports.updateVideo = async (req, res) => {
    try {
        const videoId = req.params.id;
        const updates = req.body;
        // (Optional: verify req.user.userId matches video.user before updating)
        const video = await Video.findByIdAndUpdate(videoId, updates, { new: true });
        if (!video) {
            return res.status(404).json({ error: "Video not found." });
        }
        res.json({ message: "Video updated", video });
    } catch (err) {
        res.status(500).json({ error: "Failed to update video." });
    }
};

exports.deleteVideo = async (req, res) => {
    try {
        const videoId = req.params.id;
        // (Optional: verify ownership or admin privileges)
        const video = await Video.findByIdAndDelete(videoId);
        if (!video) {
            return res.status(404).json({ error: "Video not found or already deleted." });
        }
        // Also remove all comments associated with this video (to keep DB clean)
        await Comment.deleteMany({ video: videoId });
        res.json({ message: "Video and its comments deleted." });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete video." });
    }
};

// (Optional) extra controller: getVideosByUserId for /users/:id/videos
exports.getVideosByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const videos = await Video.find({ user: userId }).populate('comments');
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user's videos." });
    }
};
