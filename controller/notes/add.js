const {
  noteSchema: { joiNoteSchema, Note },
} = require("../../models");
const createError = require("http-errors");

const add = async (req, res, next) => {
  const { error } = joiNoteSchema.validate({ ...req.body });
  const { _id: id } = req.user;

  if (error) {
    return next(createError(401, error.message));
  }

  const note = await Note.create({ ...req.body, owner: id });

  if (note) {
    res.status(201).json(note);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = add;
