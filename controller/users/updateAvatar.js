const {
  userSchema: { User },
} = require("../../models");
const Jimp = require("jimp");
const fs = require("fs/promises");
const createError = require("http-errors");

const uploadImage = require("../../helpers/uploadImage");

const updateAvatar = async (req, res, next) => {
  const { _id: id } = req.user;
  const { path: filePath } = req.file;

  try {
    const image = await Jimp.read(filePath);

    if (image.bitmap.height > image.bitmap.width) {
      await image.rotate(-270);
    }
    await image.resize(200, Jimp.AUTO);
    await image.writeAsync(filePath);
  } catch (error) {
    await fs.unlink(filePath);
    return next(createError(500, "Internal Server Error"));
  }

  const avatarURL = await uploadImage(filePath);

  if (!avatarURL) {
    await fs.unlink(filePath);
    return next(createError(500, "Internal Server Error"));
  }

  const user = await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
  if (user) {
    await fs.unlink(filePath);
    res.status(200).json({
      avatarURL: user.avatarURL,
    });
  } else {
    await fs.unlink(filePath);
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = updateAvatar;
