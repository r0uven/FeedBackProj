const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Проверка на существование пользователя с таким же email
      const foundUser = await findUserByEmail(email);
      if (!foundUser) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

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

// Регистрация пользователя
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
        // Проверка на существование пользователя с таким же email
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }
    
        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Создание нового пользователя
        const newUser = await createUser(name, email, hashedPassword);
    
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка на сервере', error });
    }
};

module.exports = { loginUser, register };  