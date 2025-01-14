const pool = require('../dbPool');  // Импортируем пул соединений из отдельного файла

// Проверка на существование пользователя с данным email
const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

// Создание нового пользователя
const createUser = async (name, email, hashedPassword) => {
  const query = `
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3) RETURNING *
  `;
  const result = await pool.query(query, [name, email, hashedPassword]);
  return result.rows[0];
};

module.exports = { findUserByEmail, createUser };
