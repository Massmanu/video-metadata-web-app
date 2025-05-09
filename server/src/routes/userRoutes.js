// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');

const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.registerUser);  // treat as register
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Auth routes
router.post('/login', userController.loginUser);
// (Alternatively, we could separate auth routes, but included here for simplicity)

router.get('/:id/videos', videoController.getVideosByUserId);
// This would use videoController to find videos for a user (optional nested route)

module.exports = router;
