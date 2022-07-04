const {
  userSchema: { User },
} = require("../../models");
const createError = require("http-errors");

const logout = async (req, res, next) => {
  const { _id: id } = req.user;

  const user = await User.findByIdAndUpdate(id, { token: null });

  if (!user) {
    return next(createError(401, "Not authorized"));
  } else {
    res.status(204).json({ message: "No Content" });
  }
};

module.exports = logout;
