const {
  userSchema: { User },
} = require("../service");
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

  try {
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    userId = id;
  } catch (error) {
    console.log(error);
    return next(createError(401, "Not authorized"));
  }

  const user = await User.findById(userId);

  if (!user || !user.token) {
    return next(createError(401, "Not authorized"));
  }

  req.user = user;
  next();
};

module.exports = auth;
