const express = require('express');
const {
    AskQuestion,
    GetAllQuestions,
    getQuestionById,
    SendAnswer,
    GetAllAnswer,
    LikeQuestion,
    LikeAnswer
} = require('../Controller/QuestionController');

const router = express.Router();

router.post('/api/ask-question', AskQuestion);

router.get('/api/all-questions', GetAllQuestions);

router.get('/questions/:id', getQuestionById);

router.post('/api/send-answer/:id', SendAnswer);

router.get('/api/all-answer/:id', GetAllAnswer);

router.post('/api/likes', LikeQuestion);

router.post('/api/answers/likes/:id', LikeAnswer);

module.exports = router;
