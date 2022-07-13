const {
  userSchema: { User },
} = require("../../models");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;
  const { JWT_SECRET_KEY } = process.env;

  if (!refreshToken) {
    return next(createError(400, "Refresh token is required"));
  }

  const user = await User.findOne({ refreshToken });

  if (!user) {
    return next(createError(401, "Not authorized"));
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { accessToken: token, refreshToken: uuidv4() },
    { new: true }
  );

  res.status(201).json({
    accessToken: newUser.accessToken,
    refreshToken: newUser.refreshToken,
    user: {
      email: newUser.email,
      name: newUser.name,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = refresh;
