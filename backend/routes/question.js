const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Question = require("../models/Question");
const Application = require("../models/Application");
const protect = require("../middlewares/authMiddleware");

router.post("/add", protect, (req, res) => {
  const { email, appId, question, answer } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      const newQuestion = new Question({ question, answer, addedBy: user.name });
      newQuestion.save().then(() => {
        //add question to the application
        Application.findById(appId).then((app) => {
          app.questions = [...app.questions, newQuestion];
          app
            .save()
            .then(() => {
              res.send({ status: true, data: app.questions });
            })
            .catch((err) =>
              res.status(400).send({
                status: false,
                message: "Question could not get added",
              })
            );
        });
      });
    } else {
      res
        .status(400)
        .send({ status: false, message: "Question could not get added" });
    }
  });
});

router.get("/get", (req, res) => {
  Question.find().then((questions) => {
    res.send({ status: true, data: questions });
  });
});

router.get("/filter/:query", (req, res) => {
  Question.find({question: {"$regex": req.params.query, "$options": "i"}})
  .then(questions => {
    res.send({status: true, data: questions})
  })
  .catch(err => res.status(400).send({status: false, message: err}))
})

module.exports = router;
