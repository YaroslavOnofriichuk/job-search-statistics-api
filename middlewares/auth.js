const {
  userSchema: { User },
} = require("../models");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  const { JWT_SECRET_KEY } = process.env;
  let userId = "";

  if (bearer !== "Bearer") {
    return next(createError(401, "Not authorized"));
  }

  jwt.verify(token, JWT_SECRET_KEY, function (err, decoded) {
    if (decoded) {
      userId = decoded.id;
    }

    if (err?.message === "jwt expired") {
      return next(createError(401, "Token expired"));
    }

    if (err) {
      return next(createError(401, "Not authorized"));
    }
  });

  const user = await User.findById(userId);

  if (!user || !user.accessToken) {
    return next(createError(401, "Not authorized"));
  }

  req.user = user;
  next();
};

module.exports = auth;
