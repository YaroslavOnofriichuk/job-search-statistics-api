const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { notesRouter, authRouter, usersRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const session = require("express-session");
app.set("trust proxy", 1);
app.use(
  session({
    secret: "Super Secret (change it)",
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "none", // must be 'none' to enable cross-site delivery
      secure: true, // must be true if sameSite='none'
    },
  })
);

app.use(logger(formatsLogger));
app.enable("trust proxy");
app.use(
  cors({
    credentials: true,
    origin: ["https://job-search-statistics.netlify.app"],
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
