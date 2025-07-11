const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      timestamp: { type: Date, default: Date.now },
    }
  ],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chat", chatSchema);
