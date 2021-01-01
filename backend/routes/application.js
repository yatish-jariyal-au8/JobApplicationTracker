const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const User = require("../models/User");
const Question = require("../models/Question");

router.post("/create", (req, res) => {
  const {
    company,
    designation,
    status,
    location,
    salary,
    url,
    email,
  } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      const newApplication = new Application({
        company,
        designation,
        status,
        location,
        salary,
        url,
        user,
        timeline: [{status, time: new Date()}]
      });
      newApplication
        .save()
        .then(() => res.send({ status: true, message: "Success" }))
        .catch((err) => res.status(400).send({ status: true, message: err }));
    }
  });

  //find user from email
  //user ->
});

// get all applicatios of a user
router.post("/get", (req, res) => {
  const { email } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      Application.find({ user })
        .then((applications) => {
          res.send({ status: true, data: applications });
        })
        .catch((err) => res.status(400).send({ status: false, message: err }));
    }
  });
});

// delete an application
router.delete("/delete/:id", (req, res) => {
  Application.deleteOne({ _id: req.params.id }).then((resp) =>
    res.send({ status: true, message: "Success" })
  );
});

// get an application
router.get("/get/:id", (req, res) => {
  Application.findById(req.params.id).then((app) => {
    res.send({ status: true, data: app });
  });
});

// edit an application
router.put("/edit/:id", (req, res) => {
  Application.findOneAndUpdate({ _id: req.params.id }, { ...req.body }).then(
    (resp) => {
      console.log("update success");
      res.send({ status: true, message: "Success" });
    }
  );
});

// get a question
router.get("/questions/get/:id", (req, res) => {
  Application.findById(req.params.id)
    .then((app) => {
      res.send({ status: true, data: app.questions });
    })
    .catch((err) =>
      res
        .status(400)
        .send({ status: false, message: "Questions could not get fetched" })
    );
});

// delete a question
router.delete("/:appId/delete/:id", (req, res) => {
  const { appId, id } = req.params;

  Application.findById(appId).then((app) => {
    const updatedQuestions = app.questions.filter((item) => {
      if (item._id.equals(id)) {
        return false;
      } else return true;
    });
    app.questions = [...updatedQuestions];
    app
      .save()
      .then(() => {
        Question.findOneAndDelete({ _id: id })
          .then(() => res.send({ status: true, data: updatedQuestions }))
          .catch((err) =>
            res
              .status(400)
              .send({ status: false, message: "question deletion failed" })
          );
      })
      .catch((err) =>
        res.status(400).send({ status: false, message: "app saving failed" })
      );
  });
});

// edit a question
router.put("/:appId/edit/:id", (req, res) => {
  const { appId, id } = req.params;
  const { question, answer } = req.body;
  console.log("question", question, answer);
  
  Question.findByIdAndUpdate(id, {question, answer})
  .then(async () => {
    const app = await Application.findById(appId)
    const updatedQuestions = app.questions.map((q) => {
      if(q._id.equals(id)) {
        return {...q, question, answer}
      }
      else return q
    })
    app["questions"] = [...updatedQuestions]
    app.save()
    .then(() => res.send({status: true, data: [...updatedQuestions]}))
    .catch(err => res.status(400).send({status: false, message: 'App not updated'}))
  })
  .catch(err => res.status(400).send({status: false, message: 'Question not updated'}))
});

/*
getAll -> /get
getById -> /get/:id
deleteByid -> /delete/:id
deleteAll -> /delete

*/

module.exports = router;
