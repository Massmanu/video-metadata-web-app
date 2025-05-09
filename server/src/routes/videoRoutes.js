// src/routes/videoRoutes.js
const express = require('express');
const upload = require('../config/multer');
const videoController = require('../controllers/videoController');

const commentRouter = require('./commentRoutes');  // nested comments router
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);

// ✅ protected route, auth must be a function
router.post('/', auth, videoController.createVideo);

router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);
// Nested: forward to commentRoutes for any requests to /:videoId/comments
router.use('/:videoId/comments', (req, res, next) => {
    // We could optionally require auth to comment; include auth here or inside comment routes.
    next();
}, commentRouter);

module.exports = router;
