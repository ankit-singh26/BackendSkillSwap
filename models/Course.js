const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },             
  description: { type: String },                        
  skills: { type: String, required: true },
  lookingFor: { type: String },
  videoURL: { type: String, required: true },
  categoryOffered: { type: String, required: true },        
  categoryLookingFor: { type: String, required: true },      
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
