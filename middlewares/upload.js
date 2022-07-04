const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const uploadFilter = function (req, file, cb) {
  if (!file.mimetype.includes("image")) {
    return cb(new Error("Wrong format"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: uploadFilter,
});

module.exports = upload;
