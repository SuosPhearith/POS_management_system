const express = require('express');
const router = express.Router();
const authoControler = require("../controllers/authController");


router.post("/login", authoControler.login);
router.post("/logout", authoControler.logout);
router.post("/refreshToken", authoControler.refresh);

module.exports = router
