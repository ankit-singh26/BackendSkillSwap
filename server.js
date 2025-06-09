const fs = require('fs');
const uploadDir = 'uploads/videos';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const courseRoutes = require('./routes/courseRoutes');
const swapRoutes = require('./routes/swapRoutes');  // Make sure path is correct

app.use('/api/swapRequests', swapRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api', courseRoutes);
app.use('/profile', require('./routes/profile'));
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
app.use("/api", require("./routes/chatRoutes")); // or whatever your route file is
app.use('/api/courses/', require('./routes/createCourse'));

app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(3000, () => console.log('Server started on port 3000'));
