const {
  userSchema: { User },
} = require("../../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;
  const { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY, EXPIRES_IN } =
    process.env;

  if (!refreshToken) {
    return next(createError(400, "Refresh token is required"));
  }

  const user = await User.findOne({ refreshToken });

  if (!user) {
    return next(createError(401, "Not authorized"));
  }

  jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY, function (err) {
    if (err) {
      return next(createError(401, "Not authorized"));
    }
  });

  const payload = {
    id: user._id,
  };

  const newAccessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
    expiresIn: EXPIRES_IN,
  });

  const newRefreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
    expiresIn: EXPIRES_IN,
  });

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { accessToken: newAccessToken, refreshToken: newRefreshToken },
    { new: true }
  );

  res.status(201).json({
    accessToken: newUser.accessToken,
    refreshToken: newUser.refreshToken,
  });
};

module.exports = refresh;
