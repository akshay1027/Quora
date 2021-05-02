import express from "express";
import questionsController from "../Controller/QuestionController";

const router = express.Router();
const QuestionController = new questionsController();

router.post("/api/ask-question", (request, response) => {
  QuestionController.AskQuestion(request, response);
});

router.get("/api/all-questions", (request, response) => {
  QuestionController.GetAllQuestions(request, response);
});

router.get("/questions/:id", (request, response) => {
QuestionController.getQuestionById(request, response);
});

router.post("/api/send-answer/:id", (request, response) => {
    QuestionController.SendAnswer(request, response);
});
  
router.get("/api/all-answer/:id", (request, response) => {
    QuestionController.GetAllAnswer(request, response);
});

router.post("/api/likes", (request, response) => {
  QuestionController.Like(request, response);
});

export default router;