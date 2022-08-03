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
  const { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env;

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

  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { accessToken, refreshToken },
    { new: true }
  );

  res.cookie("refreshToken", newUser.refreshToken, {
    maxAge: 2592000000,
    httpOnly: true,
    secure: true,
    domain: "https://job-search-statistics.netlify.app",
    sameSite: "none",
  });

  res.status(201).json({
    accessToken: newUser.accessToken,
    user: {
      email: newUser.email,
      name: newUser.name,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = login;
