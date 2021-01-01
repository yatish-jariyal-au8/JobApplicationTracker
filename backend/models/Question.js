const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: String,
    answer: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
