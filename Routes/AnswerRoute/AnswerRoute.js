import express from "express";
import AnswerController from "../../Controller/Answers/AnswerController";

const router = express.Router();
const AnswerController = new questionsController();

router.post("/ask-answer", (request, response) => {
  AnswerController.AskAnswer(request, response);
});

router.get("/all-answer", (request, response) => {
  AnswerController.GetAllAnswer(request, response);
});

router.post("/unique-question-id", (request, response) => {
  AnswerController.UniqueQuestionID(request, response);
});

export default router;