const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', index: true },
    lastLogin: { type: Date, default: Date.now } 
});

userSchema.index({ email: 1, lastLogin: -1 });

module.exports = mongoose.model('User', userSchema);