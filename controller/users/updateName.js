const {
  userSchema: { User },
} = require("../../models");
const createError = require("http-errors");

const updateName = async (req, res, next) => {
  const { _id: id } = req.user;
  const { name } = req.body;

  if (!name) {
    return next(createError(400, '"name" is required'));
  }

  const user = await User.findByIdAndUpdate(id, { name }, { new: true });
  if (user) {
    res.status(200).json({
      name: user.name,
    });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = updateName;
