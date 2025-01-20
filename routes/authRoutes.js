const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Маршрут для регистрации
router.post('/register', authController.register);

// Маршрут для авторизации
router.post('/login', authController.loginUser);
  

module.exports = router;
