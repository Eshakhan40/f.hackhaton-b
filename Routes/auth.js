const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json('User registered successfully');
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json('User not found');

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json('Invalid password');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, username: user.username });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;
