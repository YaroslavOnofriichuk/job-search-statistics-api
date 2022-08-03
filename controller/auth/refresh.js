const {
  userSchema: { User },
} = require("../../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const refresh = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env;

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
    expiresIn: "15m",
  });

  const newRefreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });

  const newUser = await User.findByIdAndUpdate(
    user._id,
    { accessToken: newAccessToken, refreshToken: newRefreshToken },
    { new: true }
  );

  res.cookie("refreshToken", newUser.refreshToken, {
    maxAge: 1296000000,
    httpOnly: true,
    secure: true,
    domain: "https://job-search-statistics.netlify.app",
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

module.exports = refresh;
