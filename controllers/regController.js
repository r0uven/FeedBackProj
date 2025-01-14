const bcrypt = require('bcryptjs');
const { findUserByEmail, createUser } = require('../models/userModel');

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

module.exports = { register };
