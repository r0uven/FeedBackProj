// models/suggestionModel.js
const pool = require('../dbPool');  // Импортируем пул соединений с базой данных

// Создание предложения
const createSuggestion = async (title, description, category_id, status_id, author_id) => {
    const result = await pool.query(
        'INSERT INTO suggestions (title, description, category_id, status_id, author_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *',
        [title, description, category_id, status_id, author_id]
    );
    return result.rows[0];
};

// Получение всех предложений
const getSuggestions = async () => {
    const result = await pool.query(
        `SELECT s.id, s.title, s.description, c.name AS category_id, st.name AS status_id, s.created_at, s.updated_at 
        FROM suggestions s
        JOIN categories c ON s.category_id = c.id
        JOIN statuses st ON s.status_id = st.id`);
    return result.rows;
};

// Получение предложения по ID
const getSuggestionById = async (id) => {
    const result = await pool.query(
        `SELECT s.id, s.title, s.description, c.name AS category_id, st.name AS status_id, s.created_at, s.updated_at 
        FROM suggestions s
        JOIN categories c ON s.category_id = c.id
        JOIN statuses st ON s.status_id = st.id
        WHERE s.id = $1`, [id]);
    return result.rows[0];
};

// Обновление предложения
const updateSuggestion = async (id, title, description, category_id, status_id) => {
    const result = await pool.query(
        `UPDATE suggestions 
        SET title = $1, description = $2, category_id = $3, status_id = $4, author_id = $5, updated_at = CURRENT_TIMESTAMP
        WHERE id = $6 RETURNING *`,
        [title, description, category_id, status_id, id]
    );
    return result.rows[0];
};


// Частичное обновление предложения
const patchSuggestion = async (id, title, description, category_id, status_id) => {
    // Формируем динамический запрос в зависимости от переданных полей
    let updateFields = [];
    let values = [];

    if (title) {
        updateFields.push('title = $' + (updateFields.length + 1));
        values.push(title);
    }
    if (description) {
        updateFields.push('description = $' + (updateFields.length + 1));
        values.push(description);
    }
    if (category_id) {
        updateFields.push('category_id = $' + (updateFields.length + 1));
        values.push(category_id);
    }
    if (status_id) {
        updateFields.push('status_id = $' + (updateFields.length + 1));
        values.push(status_id);
    }

    // Если не переданы поля для обновления, возвращаем ошибку
    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'Нет данных для обновления' });
    }

    // Добавляем id к значениям для запроса
    values.push(id);

    const query = `
        UPDATE suggestions
        SET ${updateFields.join(', ')}
        WHERE id = $${values.length}
        RETURNING *;
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
};

// Удаление предложения
const deleteSuggestion = async (id) => {
    const result = await pool.query(
        'DELETE FROM suggestions WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};

module.exports = {
    createSuggestion,
    getSuggestions,
    getSuggestionById,
    updateSuggestion,
    patchSuggestion,
    deleteSuggestion
};
