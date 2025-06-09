const express = require('express');
const auth = require('../middleware/auth');
const Chat = require('../models/Chat'); 
const router = express.Router();

router.get("/chats/:chatId/messages", auth, async (req, res) => {
  const chat = await Chat.findById(req.params.chatId);
  if (!chat) return res.status(404).json({ error: "Chat not found" });
  res.json({ messages: chat.messages });
});

router.post("/chats/:chatId/messages", auth, async (req, res) => {
  try {
    const { chatId } = req.params;
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: "Message text is required" });

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    const message = {
      senderId: req.user.id,
      text,
      timestamp: new Date()
    };

    chat.messages.push(message);
    await chat.save();

    res.status(201).json({ message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/chats", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ participants: userId })
      .sort({ updatedAt: -1 })
      .populate("participants", "name email");

    res.json({ chats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;