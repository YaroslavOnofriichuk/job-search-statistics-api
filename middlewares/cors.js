const cors = (req, res, next) => {
  // res.header(
  //   "Access-Control-Allow-Origin",
  //   "https://job-search-statistics.netlify.app"
  // );
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, Content-Type, Accept, Authorization, X-Requested-With"
  // );
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
};

module.exports = cors;
