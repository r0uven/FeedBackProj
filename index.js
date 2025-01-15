const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');  // Импортируем маршруты
const protectedRoutes = require('./routes/protectedRoutes'); // защищённые маршруты
const suggestionRoutes = require('./routes/feedbackRoutes/suggestionRoutes'); //маршруты предложений
const categoryRoutes = require('./routes/feedbackRoutes/categoryRoutes');
const statusRoutes = require('./routes/feedbackRoutes/statusRoutes');
const { findUserByEmail } = require('./models/userModel');


// Задаём порт, на котором будет работать сервер
const PORT = process.env.PORT || 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Маршруты
app.get('/', (req, res) => {                //начальная страница
  res.send('Привет мир!');
});


app.use('/api/auth', authRoutes);           // маршруты для аутентификации
app.use('/api/protected', protectedRoutes);           // защищённые маршруты
app.use('/api/suggestions', suggestionRoutes);    // маршруты для предложений
app.use('/api/categories', categoryRoutes);
app.use('/api/statuses', statusRoutes);


// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
