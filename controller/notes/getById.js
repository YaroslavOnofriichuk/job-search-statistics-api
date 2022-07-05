const {
  noteSchema: { Note },
} = require("../../models");

const getById = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findById(noteId, "-updatedAt -createdAt -owner");

  if (note) {
    res.status(200).json(note);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = getById;
