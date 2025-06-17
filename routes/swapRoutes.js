const express = require('express');
const SwapRequest = require('../models/SwapRequest');
const auth = require('../middleware/auth');
const Chat = require('../models/Chat'); // adjust path as needed
const router = express.Router();

// Create a new swap request
router.post('/request', auth, async (req, res) => {
  try {
    const { requesterId, recipientId, requesterSkill, desiredSkill, message } = req.body;
    console.log("Received swap request with body:", req.body);

    if (!requesterId || !recipientId || !requesterSkill || !desiredSkill) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const swap = new SwapRequest({
      requesterId,
      recipientId,
      requesterSkill,
      desiredSkill,
      message,
    });
    await swap.save();
    res.status(201).json({ success: true, swap });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all incoming swap requests for a specific user
router.get('/incoming/:userId', auth, async (req, res) => {
  try {
    const swaps = await SwapRequest.find({ recipientId: req.params.userId })
      .populate('requesterId', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, swaps });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Accept or reject a swap request
router.patch('/:id', auth, async (req, res) => {
  try {
    const { status, isRead } = req.body;
    const updates = {};
    if (status) updates.status = status;
    if (typeof isRead === 'boolean') updates.isRead = isRead;

    const swap = await SwapRequest.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!swap) return res.status(404).json({ success: false, error: 'Swap request not found' });

    res.status(200).json({ success: true, swap });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/swapRequests/:id/accept
router.patch("/:id/accept", auth, async (req, res) => {
  try {
    const requestId = req.params.id;
    const userId = req.user._id;

    const request = await SwapRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Uncomment to enforce recipient-only acceptance:
    // if (request.recipientId.toString() !== userId.toString()) {
    //   return res.status(403).json({ message: "Not authorized" });
    // }

    // Mark as accepted (optional if you delete right after)
    request.status = "accepted";
    await request.save();

    // Check if chat exists
    let chat = await Chat.findOne({
      participants: { $all: [request.requesterId, request.recipientId] },
    });

    // Create new chat if none exists
    if (!chat) {
      chat = new Chat({
        participants: [request.requesterId, request.recipientId],
        messages: [],
      });
      await chat.save();
    }

    // Delete the swap request after acceptance
    await SwapRequest.findByIdAndDelete(requestId);

    res.json({ message: "Request accepted and deleted", chatId: chat._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
