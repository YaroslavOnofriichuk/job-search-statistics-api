const { Schema, model } = require("mongoose");
const Joi = require("joi");

const joiUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .pattern(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
    .required(),
  name: Joi.string().default(null),
  token: Joi.string().default(null),
  avatarURL: Joi.string().default(null),
});

const userSchema = Schema(
  {
    password: {
      type: String,
      min: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      unique: true,
    },
    name: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = {
  joiUserSchema,
  User,
};
