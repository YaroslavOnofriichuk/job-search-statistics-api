const {
  noteSchema: { Note },
} = require("../../models");

const getAll = async (req, res, next) => {
  const { _id: id } = req.user;

  const notes = await Note.find({ owner: id }, "-updatedAt -createdAt -owner", {
    sort: {
      date: -1,
    },
  });

  if (notes) {
    res.status(200).json(notes);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAll;
