const {
  noteSchema: { Note },
} = require("../../models");

const getAll = async (req, res, next) => {
  const { _id: id } = req.user;
  const { sortfield = "date", sortType = "desc" } = req.query;

  const notes = await Note.find({ owner: id }, "-updatedAt -createdAt -owner", {
    sort: {
      [sortfield]: sortType,
    },
  });

  if (notes) {
    res.status(200).json(notes);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = getAll;
