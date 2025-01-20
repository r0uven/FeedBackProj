const pool = require('../dbPool');

// Проверка, голосовал ли пользователь за предложение
const hasVoted = async (suggestion_id, user_id) => {
  const result = await pool.query(
    'SELECT * FROM upvotes WHERE suggestion_id = $1 AND user_id = $2',
    [suggestion_id, user_id]
  );
  return result.rows.length > 0;
};

// Добавление голоса
const addVote = async (suggestion_id, user_id) => {
  await pool.query(
    'INSERT INTO upvotes (suggestion_id, user_id) VALUES ($1, $2)',
    [suggestion_id, user_id]
  );
  await pool.query(
    'UPDATE suggestions SET upvotes_count = upvotes_count + 1 WHERE id = $1',
    [suggestion_id]
  );
};

// Удаление голоса
const removeVote = async (suggestion_id, user_id) => {
  await pool.query(
    'DELETE FROM upvotes WHERE suggestion_id = $1 AND user_id = $2',
    [suggestion_id, user_id]
  );
  await pool.query(
    'UPDATE suggestions SET upvotes_count = upvotes_count - 1 WHERE id = $1',
    [suggestion_id]
  );
};

module.exports = { hasVoted, addVote, removeVote };
