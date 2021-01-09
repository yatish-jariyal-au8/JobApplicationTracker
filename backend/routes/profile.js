const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const fs = require("fs");
const User = require("../models/User");

router.post("/update/:id", protect, async (req, res) => {
  const { name, email, link } = req.body;
  const id = req.params.id;
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

router.get("/get/resume/:id", protect, (req, res) => {
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

router.post("/uploadResume/:id", protect, (req, res) => {
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

router.delete("/delete/resume/:id/:file", protect, (req, res) => {
  const dir = `${__dirname}/uploads/${req.params.id}/${req.params.file}`;

  fs.unlink(dir, (err) => {
    if (err) {
      res.status(400).send({ status: false, message: err });
    } else {
      res.send({ status: true, message: "Success" });
    }
  });
});

router.get("/download/resume/:id/:file", (req, res) => {
  const dir = `${__dirname}/uploads/${req.params.id}/${req.params.file}`;
  res.download(dir)
})

module.exports = router;
