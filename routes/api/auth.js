const express = require("express");
const { authController } = require("../../controller");
// const { auth, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

// router.get("/logout", auth, ctrlUsers.logout);

// router.get("/current", auth, ctrlUsers.current);

// router.patch("/", auth, ctrlUsers.updateSubscription);

// router.patch("/avatars", auth, upload.single("avatar"), ctrlUsers.avatars);

// router.get("/verify/:verificationToken", ctrlUsers.verifyByToken);

// router.post("/verify", ctrlUsers.verifyByEmail);

module.exports = router;
