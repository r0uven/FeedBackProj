const express = require('express');
const { register } = require('../controllers/regController');
const { loginUser } = require('../controllers/loginController');

const router = express.Router();

// Маршрут для регистрации
router.post('/register', register);

// Маршрут для авторизации
router.post('/login', loginUser);
  

module.exports = router;
