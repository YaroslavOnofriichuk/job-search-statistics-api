const {
  userSchema: { joiUserSchema, User },
} = require("../../models");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = joiUserSchema.validate({ email, password });
  let hash = null;

  if (error) {
    return next(createError(401, error.message));
  }

  const user = await User.findOne({ email });

  if (user) {
    return next(createError(409, "Email in use"));
  }

  try {
    hash = await bcrypt.hash(password, 9);
  } catch (error) {
    console.log(error);
  }

  if (hash) {
    const newUser = await User.create({
      email,
      password: hash,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
      },
    });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = register;
