const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const User = require("../models/User");

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

// edit an application
router.get("/get/:id", (req, res) => {
  Application.findById(req.params.id).then((app) => {
    res.send({ status: true, data: app });
  });
});

router.put("/edit/:id", (req, res) => {
  Application.findOneAndUpdate({ _id: req.params.id }, { ...req.body }).then(
    (resp) => {
        console.log("update success")
      res.send({ status: true, message: "Success" });
    }
  );
});

/*
getAll -> /get
getById -> /get/:id
deleteByid -> /delete/:id
deleteAll -> /delete

*/

module.exports = router;
