const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');  // Импортируем маршруты
const protectedRoutes = require('./routes/protectedRoutes'); // защищённые маршруты

// Задаём порт, на котором будет работать сервер
const PORT = process.env.PORT || 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Маршруты
app.get('/', (req, res) => {  //начальная страница
  res.send('Привет, Express!');
});

app.use('/api/auth', authRoutes); // маршруты для аутентификации
app.use('/api', protectedRoutes);           // защищённые маршруты

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
