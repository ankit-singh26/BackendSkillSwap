// routes/courses.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Course = require("../models/Course");

router.post("/create-course", auth, async (req, res) => {
  const {
    title,
    description,
    skills,
    lookingFor,
    categoryOffered,
    categoryLookingFor,
    videoURL,
  } = req.body;

  if (!title || !skills || !categoryOffered || !categoryLookingFor || !videoURL) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const course = new Course({
      user: req.user.id,
      title,
      description,
      skills,
      lookingFor,
      categoryOffered,
      categoryLookingFor,
      videoURL,
    });

    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
