const express = require('express');
const {
    GetAllUsers,
} = require('../Controller/FindUsersController');

const router = express.Router();

router.get("/api/users", GetAllUsers);

module.exports = router;