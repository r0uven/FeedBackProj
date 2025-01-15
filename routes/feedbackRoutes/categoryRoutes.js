const express = require('express');
const router = express.Router();
const pool = require('../../dbPool');

// Получение всех категорий
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Ошибка сервера при получении категорий' });
  }
});

module.exports = router;
