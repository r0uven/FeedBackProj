// Импортируем Express
const express = require('express');
const app = express();

// Задаём порт, на котором будет работать сервер
const PORT = process.env.PORT || 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Маршрут для главной страницы
app.get('/', (req, res) => {
  res.send('Привет, Express!');
});

  // Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
