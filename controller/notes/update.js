const {
  noteSchema: { Note, joiUpdateNoteSchema },
} = require("../../models");
const createError = require("http-errors");

const update = async (req, res, next) => {
  const { noteId } = req.params;
  const { error } = joiUpdateNoteSchema.validate({ ...req.body });

  if (error) {
    return next(createError(400, error.message));
  }

  const note = await Note.findByIdAndUpdate(
    noteId,
    { ...req.body },
    { new: true }
  );
  if (note) {
    res.status(200).json({ note });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = update;
