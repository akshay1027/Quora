import express from "express";
import questionsController from "../../Controller/Questions/QuestionController";

const router = express.Router();
const QuestionController = new questionsController();

router.post("/ask-question", (request, response) => {
  QuestionController.AskQuestion(request, response);
});

router.get("/all-questions", (request, response) => {
  QuestionController.GetAllQuestions(request, response);
});

router.post("/likes", (request, response) => {
  QuestionController.Like(request, response);
});
export default router;