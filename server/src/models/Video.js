// src/models/Video.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const VideoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },  // location of the video file or streaming link
    uploadedAt: { type: Date, default: Date.now },
    user: {  // Reference to User (the uploader)
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // We will store comments in a separate collection (Comment model), 
    // but we can optionally keep an array of comment IDs for fast access:
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
