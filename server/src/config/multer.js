// server.js (or a separate config file like src/config/multer.js)
const path = require('path');
const multer = require('multer');

// Configure storage to preserve the original file extension (e.g., .mp4)
const storage = multer.diskStorage({
    // Destination folder for uploads
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads')); // adjust path as needed
    },
    // Filename: use timestamp + original extension
    filename: (req, file, cb) => {
        // Extract the file extension from the original name
        const ext = path.extname(file.originalname);
        // Create a unique filename with that extension
        const name = `${file.fieldname}-${Date.now()}${ext}`;
        cb(null, name);
    }
});

// File filter to accept only certain video types (optional but recommended)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /mp4|mov|avi|mkv/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type. Only video files are allowed.'), false);
    }
};

// Create the multer upload middleware
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 500 * 1024 * 1024 } // optional: limit to 500MB
});

module.exports = upload;

// In your routes file where you handle video creation, use it like:
// const express = require('express');
// const upload = require('./config/multer');
// const router = express.Router();

// router.post('/videos', upload.single('videoFile'), videoController.createVideo);

// Now, when a user uploads a file via the 'videoFile' field, it will be
// saved as something like 'videoFile-1683078400000.mp4' in the uploads folder,
// preserving the .mp4 extension.
