const express = require('express');
const router = express.Router();
const suggestionController = require('../../controllers/suggestionController');  // Импортируем контроллер

// Маршруты для предложений
router.post('/', suggestionController.createSuggestion);  // Создать предложение
router.get('/', suggestionController.getSuggestions);  // Получить все предложения
router.get('/:id', suggestionController.getSuggestionById);  // Получить предложение по ID
router.put('/:id', suggestionController.updateSuggestion);  // Обновить предложение
router.patch('/:id', suggestionController.patchSuggestion);  // Частично обновить предложение
router.delete('/:id', suggestionController.deleteSuggestion);  // Удалить предложение

module.exports = router;
