const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');  // Middleware для проверки токена
const router = express.Router();
const userController = require('../controllers/userController');  // Импорт контроллера

// Роут для получения профиля пользователя
router.get('/profile', authenticateToken, userController.getUserProfile);

module.exports = router;
