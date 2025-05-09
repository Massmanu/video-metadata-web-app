// src/models/Comment.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    video: {  // Reference to the Video this comment belongs to
        type: Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    },
    user: {  // Reference to the User who wrote the comment
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
