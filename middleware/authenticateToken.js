const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Получаем токен из заголовка

  if (!token) {
    return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);  // Верификация токена
    req.user = decoded;  // Добавляем информацию о пользователе в запрос
    next();
  } catch (error) {
    res.status(401).json({ message: 'Неверный токен' });
  }
};

module.exports = authenticateToken;
