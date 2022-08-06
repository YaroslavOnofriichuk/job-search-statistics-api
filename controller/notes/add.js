const {
  noteSchema: { joiNoteSchema, Note },
} = require("../../models");
const createError = require("http-errors");

const add = async (req, res, next) => {
  const { error } = joiNoteSchema.validate({ ...req.body });
  const { _id: id } = req.user;

  if (error) {
    return next(createError(400, error.message));
  }

  if (req.body.source === "other") {
    req.body.source = req.body.customSource;
  }

  const notes = await Note.findOne({
    position: req.body.position,
    company: req.body.company,
    owner: id,
  });

  if (notes) {
    return next(
      createError(409, "You have already sent your resume for this vacancy")
    );
  }

  const note = await Note.create({ ...req.body, owner: id });

  if (note) {
    res.status(201).json(note);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = add;
