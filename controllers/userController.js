const userModel = require('../models/userModel');  // Импорт модели для работы с пользователями

// Контроллер для получения профиля пользователя
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;  // Получаем userId из токена

        // Используем модель для получения данных пользователя
        const userProfile = await userModel.getUserProfileById(userId);

        if (!userProfile) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Возвращаем данные профиля пользователя
        res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

module.exports = { getUserProfile };
