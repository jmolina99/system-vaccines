const mongoose = require("mongoose"),
  { Schema } = mongoose;

const Employee = new Schema({
  dni: { type: String, unique: true, index: true },
  names: { type: String },
  last_names: { type: String },
  email: { type: String },
  birthday: { type: String },
  address: { type: String },
  phone: { type: String },
  status_vaccine: { type: Boolean },
  type_vaccine: {
    type: String,
    enum: ["Sputnik", "AstraZeneca", "Pfizer", "Jhonson&Jhonson", null]
  },
  date_vaccine: { type: Date },
  doses_vaccine: { type: Number },
  status_employee: { type: Boolean },
});

module.exports = mongoose.model("employees", Employee);
