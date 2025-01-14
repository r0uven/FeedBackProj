const pool = require('../dbPool');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Поиск пользователя по email
      const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
      if (user.rows.length === 0) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      const foundUser = user.rows[0];
  
      // Проверка пароля
      const validPassword = await bcrypt.compare(password, foundUser.password);
  
      if (!validPassword) {
        return res.status(400).json({ message: 'Неверный пароль' });
      }
  
      // Создание JWT-токена
      const token = jwt.sign({ userId: foundUser.id }, JWT_SECRET, { expiresIn: '1h' });
  
      // Отправка токена клиенту
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при авторизации', error });
    }
  };
  
  module.exports = { loginUser };