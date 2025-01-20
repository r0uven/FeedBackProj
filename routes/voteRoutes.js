const express = require('express');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware для проверки токена
const pool = require('../dbPool');  // Подключение к базе данных
const router = express.Router();

// Маршрут для голосования
router.post('/upvote', authenticateToken, async (req, res) => {
  const { suggestion_id } = req.body;  // Получаем id предложения
  const user_id = req.user.userId;  // Получаем id пользователя из токена

  try {
    // Проверяем, голосовал ли пользователь уже за это предложение
    const checkVote = await pool.query(
      'SELECT * FROM upvotes WHERE suggestion_id = $1 AND user_id = $2',
      [suggestion_id, user_id]
    );

    if (checkVote.rows.length > 0) {
      return res.status(400).json({ message: 'Вы уже голосовали за это предложение.' });
    }

    // Добавляем новый голос
    await pool.query(
      'INSERT INTO upvotes (suggestion_id, user_id) VALUES ($1, $2)',
      [suggestion_id, user_id]
    );

    // Увеличиваем счетчик голосов у предложения
    await pool.query(
      'UPDATE suggestions SET upvotes_count = upvotes_count + 1 WHERE id = $1',
      [suggestion_id]
    );

    res.status(200).json({ message: 'Ваш голос учтен.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
});

router.post('/downvote', authenticateToken, async (req, res) => {
  const { suggestion_id } = req.body;
  const user_id = req.user.userId;

  try {
    const checkVote = await pool.query(
      'SELECT * FROM upvotes WHERE suggestion_id = $1 AND user_id = $2',
      [suggestion_id, user_id]
    );

    if (checkVote.rows.length === 0) {
      return res.status(400).json({ message: 'Вы не голосовали за это предложение.' });
    }

    // Удаляем голос
    await pool.query(
      'DELETE FROM upvotes WHERE suggestion_id = $1 AND user_id = $2',
      [suggestion_id, user_id]
    );

    // Уменьшаем счетчик голосов у предложения
    await pool.query(
      'UPDATE suggestions SET upvotes_count = upvotes_count - 1 WHERE id = $1',
      [suggestion_id]
    );

    res.status(200).json({ message: 'Ваш голос удален.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
});


module.exports = router;
