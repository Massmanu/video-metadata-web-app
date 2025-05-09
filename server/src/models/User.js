// src/models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // (stored hashed in practice)
    // (Optional) videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }]
    // We can derive user’s videos by querying Video model, so storing array is optional
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
