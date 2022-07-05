const express = require("express");
const { notesController } = require("../../controller");
const { auth } = require("../../middlewares");

const router = express.Router();

router.get("/", auth, notesController.getAll);

router.get("/:noteId", auth, notesController.getById);

router.post("/", auth, notesController.add);

router.delete("/:noteId", auth, notesController.remove);

router.patch("/:noteId", auth, notesController.update);

module.exports = router;
