import express from "express";
import AnswersController from "../../Controller/Answers/AnswerController";

const router = express.Router();
const AnswerController = new AnswersController();

router.post("/ask-answer", (request, response) => {
  AnswerController.AskAnswer(request, response);
});

router.get("/all-answer", (request, response) => {
  AnswerController.GetAllAnswer(request, response);
});

router.get("/answer/:id", (request, response) => {
  AnswerController.getQuestionById(request, response);
});

router.post("/all-answer/likes", (request, response) => {
  AnswerController.Like(request, response);
}); 

export default router;