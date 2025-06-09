const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requesterSkill: { type: String, required: true },
  desiredSkill: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('SwapRequest', swapRequestSchema);
