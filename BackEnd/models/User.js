const mongoose = require("mongoose"),
  { Schema } = mongoose;

const User = new Schema({
  rol: {
    type: String,
    enum: ["administrator", "employee"],
  },
  username: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("users", User);
