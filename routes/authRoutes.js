const express = require('express');
const { register } = require('../controllers/regController');

const router = express.Router();

// Маршрут для регистрации
router.post('/register', register);

module.exports = router;
