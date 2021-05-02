import express from "express";
import AnswersController from "../Controller/AnswerController";

const router = express.Router();
const AnswerController = new AnswersController();

router.post("/api/send-answer/", (request, response) => {
  AnswerController.AskAnswer(request, response);
});

router.get("/api/all-answer", (request, response) => {
  AnswerController.GetAllAnswer(request, response);
});


//============ get question by ID ================



router.post("/api/all-answer/likes", (request, response) => {
  AnswerController.Like(request, response);
}); 

export default router;