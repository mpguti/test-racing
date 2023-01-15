import mongoose, { Schema, model } from "mongoose";

const session = new Schema(
  {
    alias: {
      type: String,
      required: true,
    },
    circuito: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    mejorvuelta: {
      type: String,
      required: true,
    },
    condicion: {
      type: String,
      required: true,
    },
    idowner: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Session = mongoose.model("Session", session);
module.exports = Session;
