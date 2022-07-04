const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const index = file.mimetype.indexOf("/");
    const type = file.mimetype.slice(index + 1, file.mimetype.length);
    cb(null, `${req.user._id}-avatar.${type}`);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
