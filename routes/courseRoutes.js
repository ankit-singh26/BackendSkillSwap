// For example in routes/courseRoutes.js or directly in server.js/app.js

const express = require('express');
const router = express.Router();
const Course = require('../models/Course'); // adjust path
const auth = require('../middleware/auth');
// GET all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('user', 'username email') // adjust fields you want to show
      .sort({ createdAt: -1 }); // latest first

    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Server error fetching courses' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
