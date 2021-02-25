import express from "express";
import authController from "../../Controller/Auth/AuthController";

const router = express.Router();
const AuthController = new authController();

router.post("/signup", (request, response) => {
  AuthController.SignUp(request, response);
});

router.post("/signin", (request, response) => {
  AuthController.Login(request, response);
});

router.get("/isLoggedIn", (request, response) => {
  AuthController.isLoggedIn(request, response);
});

export default router;