const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const { cors } = require("./middlewares");

const { notesRouter, authRouter, usersRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://job-search-statistics.netlify.app"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "origin, content-type, accept, Authorization, X-Requested-With"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//   next();
// });
// app.use(
//   cors({
//     origin: ["https://job-search-statistics.netlify.app"],
//     // credentials: true,
//     // allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
app.use(
  cors({
    credentials: true,
    origin: ["https://job-search-statistics.netlify.app"],
  })
);
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
