const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;  // Получаем userId из токена

    // Получаем данные пользователя из базы данных по его ID
    const result = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Возвращаем данные профиля пользователя
    const userProfile = result.rows[0];
    res.json(userProfile);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;