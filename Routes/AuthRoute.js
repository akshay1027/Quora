const express = require('express');
const {
    SignUp,
    Login,
    isLoggedIn,
} = require('../Controller/AuthController');

const router = express.Router();

router.post('/signup', SignUp);

router.post('/signin', Login);

router.get('/isLoggedIn', isLoggedIn);

/*router.post("/signup", (request, response) => {
  AuthController.SignUp(request, response);
});

router.post("/signin", (request, response) => {
  AuthController.Login(request, response);
});

router.get("/isLoggedIn", (request, response) => {
  AuthController.isLoggedIn(request, response);
});*/

module.exports = router;