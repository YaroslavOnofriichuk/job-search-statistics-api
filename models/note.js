const { Schema, model } = require("mongoose");
const Joi = require("joi");

const joiNoteSchema = Joi.object({
  company: Joi.string().required(),
  date: Joi.string().required(),
  position: Joi.string().required(),
  source: Joi.string().required(),
  customSource: Joi.string().empty("").default(null),
  description: Joi.string().empty("").default(null),
  status: Joi.string()
    .valid(
      "Прийнято",
      "Відхилено",
      "Розглядається",
      "Дзвінок рекрутера",
      "Інтерв'ю",
      "Тестове завдання",
      "Надіслано"
    )
    .default("Надіслано"),
  url: Joi.string().empty("").default(null),
});

const joiUpdateNoteSchema = Joi.object({
  description: Joi.string().empty("").default(null),
  status: Joi.string()
    .valid(
      "Прийнято",
      "Відхилено",
      "Розглядається",
      "Дзвінок рекрутера",
      "Інтерв'ю",
      "Тестове завдання",
      "Надіслано"
    )
    .default("Надіслано"),
});

const noteSchema = Schema(
  {
    company: {
      type: String,
      required: [true, "Name is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
    },
    source: {
      type: String,
      required: [true, "Source is required"],
    },
    customSource: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: [
        "Прийнято",
        "Відхилено",
        "Розглядається",
        "Дзвінок рекрутера",
        "Інтерв'ю",
        "Тестове завдання",
        "Надіслано",
      ],
      default: "Надіслано",
    },
    url: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Note = model("note", noteSchema);

module.exports = {
  joiNoteSchema,
  joiUpdateNoteSchema,
  Note,
};
