const {
  noteSchema: { Note },
} = require("../../models");

const remove = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findByIdAndDelete(noteId);
  if (note) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = remove;
