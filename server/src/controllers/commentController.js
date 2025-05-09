// src/controllers/commentController.js
const Comment = require('../models/Comment');
const Video = require('../models/Video');
const mongoose = require('mongoose');


exports.getComments = async (req, res) => {
    try {
        const filter = {};
        // If this route is called under /videos/:videoId, we have req.params.videoId
        if (req.params.videoId) {
            filter.video = req.params.videoId;
        }
        // We could also allow filtering by user via query: ?user=<id>
        if (req.query.user) {
            filter.user = req.query.user;
        }
        const comments = await Comment.find(filter)
            .populate('user', 'username email')
            .populate('video', 'title');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve comments." });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('user', 'username')
            .populate('video', 'title');
        if (!comment) {
            return res.status(404).json({ error: "Comment not found." });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ error: "Error fetching comment." });
    }
};

exports.createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { videoId } = req.params;

        // Basic validation
        if (!text) return res.status(400).json({ error: 'Comment text is required.' });
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({ error: 'Invalid video ID.' });
        }
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: 'Unauthorized: Missing user.' });
        }

        // Create and save comment
        const newComment = new Comment({
            text,
            video: videoId,
            user: req.user.userId,
        });

        await newComment.save();

        // Optional: Add comment ID to video document
        await Video.findByIdAndUpdate(videoId, { $push: { comments: newComment._id } });

        const populatedComment = await newComment.populate('user', 'username email');

        return res.status(201).json(populatedComment);
    } catch (err) {
        console.error("❌ Failed to create comment:", err);
        res.status(500).json({ error: 'Server error while saving comment.' });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { text } = req.body;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found." });
        }
        // (Optional: check req.user.userId === comment.user before allowing edit)
        comment.text = text || comment.text;
        await comment.save();
        res.json({ message: "Comment updated.", comment });
    } catch (err) {
        res.status(500).json({ error: "Failed to update comment." });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found or already deleted." });
        }
        // Optionally, remove this comment from Video.comments array:
        // await Video.findByIdAndUpdate(comment.video, { $pull: { comments: commentId } });
        res.json({ message: "Comment deleted." });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete comment." });
    }
};
