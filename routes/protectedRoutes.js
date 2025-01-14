const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Привет, пользователь с ID: ${req.user.userId}` });
});

module.exports = router;