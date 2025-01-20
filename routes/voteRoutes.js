const express = require('express');
const authenticateToken = require('../middleware/authenticateToken'); 
const voteController = require('../controllers/voteController');  // Импортируем контроллер для голосования
const router = express.Router();

// Маршрут для голосования за предложение
router.post('/upvote', authenticateToken, voteController.upvote);

// Маршрут для отмены голоса за предложение
router.post('/downvote', authenticateToken, voteController.downvote);

module.exports = router;
