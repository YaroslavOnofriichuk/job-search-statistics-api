const express = require("express");
const { usersController } = require("../../controller");
const { auth, upload } = require("../../middlewares");

const router = express.Router();

router.get("/current", auth, usersController.current);

router.patch("/name", auth, usersController.updateName);

router.patch(
  "/avatar",
  auth,
  upload.single("avatar"),
  usersController.updateAvatar
);

module.exports = router;
