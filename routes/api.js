const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Example protected route
router.get('/protected', auth, (req, res) => {
  res.json({ message: 'Access granted to protected route', userId: req.user });
});

module.exports = router;
