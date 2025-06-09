// routes/profile.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const Course = require('../models/Course'); 
require('dotenv').config(); // adjust path if needed

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// GET /profile route
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).select('-password');
    if (!userData) return res.status(404).send('User not found');
    res.json(userData);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.get('/courses', authenticateToken, async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id }); // fetch courses by user ID
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
