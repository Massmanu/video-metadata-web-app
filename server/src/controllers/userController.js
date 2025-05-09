const User = require('../models/User');
const bcrypt = require('bcryptjs');       // or 'bcrypt'
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Simple validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields (username, email, password) are required." });
        }
        // Check if user exists
        const exists = await User.findOne({ $or: [{ username }, { email }] });
        if (exists) {
            return res.status(400).json({ error: "Username or email already in use." });
        }
        // Hash password for security
        const hashedPw = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPw });
        await newUser.save();
        // Generate JWT token for the new user
        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.status(201).json({ message: "User registered", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during registration." });
    }
};

// Login an existing user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials." });
        }
        // Compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Invalid credentials." });
        }
        // Create JWT
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during login." });
    }
};

// GET /users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');  // omit passwords
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
};

// GET /users/:id
exports.getUserById = async (req, res) => {
    try {
        const user = await User
            .findById(req.params.id)
            .select('-password');
        if (!user) return res.status(404).json({ error: 'User not found.' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching user.' });
    }
};

// PUT /users/:id
exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;
        // Optional: only allow the user themselves (or admin) to update
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true })
            .select('-password');
        if (!user) return res.status(404).json({ error: 'User not found.' });
        res.json({ message: 'User updated.', user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user.' });
    }
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found.' });
        res.json({ message: 'User deleted.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user.' });
    }
};