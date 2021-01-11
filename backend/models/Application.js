const mongoose = require("mongoose");
const User = require("./User");

const ApplicationSchema = new mongoose.Schema({
  company: String,
  designation: String,
  location: String,
  url: String,
  status: String,
  salary: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  questions: [],
  date: Date,
  timeline: [],
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
