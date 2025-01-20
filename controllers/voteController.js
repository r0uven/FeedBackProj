const voteModel = require('../models/voteModel');

// Голосование "за" предложение
const upvote = async (req, res) => {
  const { suggestion_id } = req.body;
  const user_id = req.user.userId;

  try {
    const hasVoted = await voteModel.hasVoted(suggestion_id, user_id);
    if (hasVoted) {
      return res.status(400).json({ message: 'Вы уже голосовали за это предложение.' });
    }

    await voteModel.addVote(suggestion_id, user_id);
    res.status(200).json({ message: 'Ваш голос учтен.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
};

// Отмена голоса
const downvote = async (req, res) => {
  const { suggestion_id } = req.body;
  const user_id = req.user.userId;

  try {
    const hasVoted = await voteModel.hasVoted(suggestion_id, user_id);
    if (!hasVoted) {
      return res.status(400).json({ message: 'Вы не голосовали за это предложение.' });
    }

    await voteModel.removeVote(suggestion_id, user_id);
    res.status(200).json({ message: 'Ваш голос удален.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
};

module.exports = { upvote, downvote };
