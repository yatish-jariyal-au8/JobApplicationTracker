const express = require("express");
const router = express.Router();
const User = require("../models/User");
const protect = require("../middlewares/authMiddleware");
const generateToken = require("../utils/generateToken");
const fs = require("fs");

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
    console.log("user", user)
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

router.post("/update/:id", protect, async (req, res) => {
  const { name, email, link } = req.body;
  const id = req.params.id;
  console.log("link", link);
  const user = await User.findByIdAndUpdate(req.params.id, {
    name,
    email,
    link,
  });
  user
    .save()
    .then(() => res.send({ status: true, data: { name, email, link, id } }))
    .catch((err) =>
      res
        .status(400)
        .send({ status: false, message: "Profile updation failed" })
    );
});

router.get("/get/resume/:id", (req, res) => {
  const dir = `${__dirname}/uploads/${req.params.id}`;
  if (dir) {
    const fileList = fs.readdir(dir, (err, files) => {
      if (err) {
        res
          .status(400)
          .send({ status: false, message: "File fetching failed" });
      }
      res.send({ status: true, data: files });
    });
  } else res.send({ status: true, data: [] });
});

router.post("/uploadResume/:id", (req, res) => {
  const file = req.files.resume;
  const dir = `${__dirname}/uploads/${req.params.id}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  file.mv(`${dir}/${file.name}`, function (err, data) {
    if (err) {
      console.log("err", err);
      return res.status(500).send(err);
    }
    return res.json({ file: `uploads/${file.name}` });
  });
});

router.delete("/delete/resume/:id/:file", (req, res) => {
  const dir = `${__dirname}/uploads/${req.params.id}/${req.params.file}`;
  console.log("dir", dir);

  fs.unlink(dir, (err) => {
    if (err) {
      res.status(400).send({ status: false, message: err });
    } else {
      res.send({ status: true, message: "Success" });
    }
  });
});

module.exports = router;
