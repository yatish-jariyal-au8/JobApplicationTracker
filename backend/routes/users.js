const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// register
router.post("/register", (req, res) => {
  // email, password, name
  const { email, password, name } = req.body;

  //check if email already exists
  User.findOne({ email: email }).then((user) => {
    if (user) {
      // email exists
      res.status(400).send({ status: false, message: "Email already exists" });
    } else {
      const newUser = new User({ email, name, password });
      newUser
        .save()
        .then(() =>
          res.send({
            status: true,
            message: "Success",
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id),
          })
        )
        .catch((err) => res.status(400).send({ status: false, message: err }));
    }
  });
});

// login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // check if email exists in db
  User.findOne({ email }).then((user) => {
    //check if user exists
    if (user) {
      //check if password matches
      if (user.password === password) {
        res.send({
          status: true,
          message: "Success",
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
          link: user.link
        });
      } else {
        res
          .status(400)
          .send({ status: false, message: "Password does not match" });
      }
    } else {
      res.status(400).send({ status: false, message: "Email does not exists" });
    }
  });
});

// login with google
router.post("/loginWithGoogle", (req, res) => {
  const { email, name } = req.body;

  // check if email exists in db
  User.findOne({ email }).then((user) => {
    //check if user exists
    if (user) {
      res.send({
        status: true,
        message: "Success",
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        link: user.link
      });
    } else {
      // register user
      const newUser = new User({ email, name });
      newUser.save().then((resp) => {
        res.send({
          status: true,
          message: "Success",
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          token: generateToken(newUser._id),
        });
      }).catch(err => res.status(400).send({status: false, message: "failed"}))
    }
  });
});

module.exports = router;
