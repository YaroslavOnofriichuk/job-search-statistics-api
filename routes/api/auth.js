const express = require("express");
const { authController } = require("../../controller");
const { auth } = require("../../middlewares");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/logout", auth, authController.logout);

router.post("/refresh", authController.refresh);

module.exports = router;
