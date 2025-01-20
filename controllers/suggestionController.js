const suggestionModel = require('../models/suggestionModel');

// Создать предложение
const createSuggestion = async (req, res) => {
    const { title, description, category_id, status_id, author_id } = req.body;
    try {
        const newSuggestion = await suggestionModel.createSuggestion(title, description, category_id, status_id, author_id);
        res.status(201).json(newSuggestion);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка создания предложения', error: error.message });
    }
};

// Получить все предложения
const getSuggestions = async (req, res) => {
    try {
        const suggestions = await suggestionModel.getSuggestions();
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка получения предложений', error: error.message });
    }
};

// Получить предложение по ID
const getSuggestionById = async (req, res) => {
    const { id } = req.params;
    try {
        const suggestion = await suggestionModel.getSuggestionById(id);
        if (!suggestion) {
            return res.status(404).json({ message: 'Предложение не найдено' });
        }
        res.status(200).json(suggestion);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка получения предложения', error: error.message });
    }
};

// Обновить предложение
const updateSuggestion = async (req, res) => {
    const { id } = req.params;
    const { title, description, category_id, status_id } = req.body;
    try {
        const updatedSuggestion = await suggestionModel.updateSuggestion(id, title, description, category_id, status_id);
        if (!updatedSuggestion) {
            return res.status(404).json({ message: 'Предложение не найдено' });
        }
        res.status(200).json(updatedSuggestion);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка обновления предложения', error: error.message });
    }
};

// Частично обновить предложение
const patchSuggestion = async (req, res) => {
    const { id } = req.params;
    const { title, description, category_id, status_id } = req.body;
    try {
        const patchSuggestion = await suggestionModel.patchSuggestion(id, title, description, category_id, status_id);
        if (!patchSuggestion) {
            return res.status(404).json({ message: 'Предложение не найдено' });
        }
        res.status(200).json(patchSuggestion);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка обновления предложения', error: error.message });
    }
};

// Удалить предложение
const deleteSuggestion = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSuggestion = await suggestionModel.deleteSuggestion(id);
        if (!deletedSuggestion) {
            return res.status(404).json({ message: 'Предложение не найдено' });
        }
        res.status(200).json({ message: 'Предложение удалено', suggestion: deletedSuggestion });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка удаления предложения', error: error.message });
    }
};

const getFilteredAndSortedSuggestions = async (req, res) => {
    const { category_id, status_id, sort_by } = req.query;  // Получаем параметры из query-параметров

    try {
        const suggestions = await suggestionModel.getSuggestionsWithFiltersAndSorting(category_id, status_id, sort_by);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка получения предложений', error: error.message });
    }
};

module.exports = {
    createSuggestion,
    getSuggestions,
    getSuggestionById,
    updateSuggestion,
    patchSuggestion,
    deleteSuggestion,
    getFilteredAndSortedSuggestions
}