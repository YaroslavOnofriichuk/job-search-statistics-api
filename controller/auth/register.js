const {
  userSchema: { joiUserSchema, User },
} = require("../../models");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = joiUserSchema.validate({ email, password });

  if (error) {
    return next(createError(401, error.message));
  }

  const user = await User.findOne({ email });

  if (user) {
    return next(createError(409, "Email in use"));
  }
};

module.exports = register;
