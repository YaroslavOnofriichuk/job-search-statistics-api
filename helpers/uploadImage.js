const imgbbUploader = require("imgbb-uploader");
require("dotenv").config();

const { IMGBB_API_KEY } = process.env;

const uploadImage = async (path) => {
  try {
    const response = await imgbbUploader(IMGBB_API_KEY, path);
    return response.url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = uploadImage;
