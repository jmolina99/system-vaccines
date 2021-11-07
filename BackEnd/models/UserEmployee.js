const mongoose = require("mongoose"),
  { Schema } = mongoose;

const UserEmployee = new Schema({
  id_employee: { type: String },
  id_user: { type: String },
});

module.exports = mongoose.model("user_employees", UserEmployee);
