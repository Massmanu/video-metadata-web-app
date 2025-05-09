// src/routes/commentRoutes.js
const express = require('express');
const commentController = require('../controllers/commentController');
const auth = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

// If this router is called under /videos/:videoId/comments, 
// then req.params.videoId will be available. We use that in controllers.

router.get('/', commentController.getComments);          // get all comments (possibly filtered by videoId via req.params)
router.get('/:id', commentController.getCommentById);
router.post('/', auth, commentController.createComment);   // protected: only logged in users
router.put('/:id', commentController.updateComment); // (optional: only author can edit)
router.delete('/:id', commentController.deleteComment); // (optional: only author/admin)

module.exports = router;
