const {
  userSchema: { joiUserSchema, User },
} = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = joiUserSchema.validate({ email, password });
  let checkPasswordResult = false;
  const { JWT_SECRET_KEY } = process.env;

  if (error) {
    return next(createError(400, error.message));
  }

  const user = await User.findOne({ email });

  try {
    checkPasswordResult = await bcrypt.compare(password, user.password);
  } catch (error) {
    console.log(error);
  }

  if (!user || !checkPasswordResult) {
    return next(createError(401, "Email or password is wrong"));
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  res.status(201).json({
    token: newUser.token,
    user: {
      email: newUser.email,
      name: newUser.name,
      avatarUrl: newUser.avatarUrl,
    },
  });
};

module.exports = login;
