const pool = require('../dbPool');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Проверка на существование пользователя с таким же email
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }

  
      const foundUser = existingUser.rows[0];
  
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