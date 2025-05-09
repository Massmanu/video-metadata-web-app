// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Your existing register/login handlers here…

// GET /auth/me – now authMiddleware is a real function
router.get('/me', authMiddleware, (req, res) => {
    const { _id, username, email, createdAt } = req.user;
    res.json({ user: { _id, username, email, createdAt } });
});

module.exports = router;
