const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const fs = require("fs");
const User = require("../models/User");
const Image = require("../models/Image");

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

router.post("/uploadProfilePhoto/:id", protect, (req, res) => {
  const file = req.files.profilePhoto;
  const dir = `${__dirname}/uploads/${req.params.id}`;
  const splitted = file.name.split(".")
  const extension = splitted[splitted.length-1]

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  file.mv(`${dir}/profilePhoto.${extension}`, function (err, data) {
    if (err) {
      console.log("err", err);
      return res.status(500).send(err);
    }
    console.log("file", file)
    const imgData = {data: new Buffer.from(file.data, 'base64'), contentType: file.mimetype}
    console.log("img data", imgData)
    const image = new Image()
    image.data = fs.readFileSync(`${dir}/profilePhoto.${extension}`)
    image.contentType = file.mimetype
    console.log("image", image)
    image.save()
    .then(data => res.send({status: true, message: "success"}))
  });
});

router.get("/download/profilePhoto/:id", (req, res) => {
  const dir = `${__dirname}/uploads/${req.params.id}`;
  if (!fs.existsSync(dir)) {
    res.send({status: true, data: null})
  }

  if (dir) {
    const fileList = fs.readdir(dir, (err, files) => {
      if (err) {
        res
          .status(400)
          .send({ status: false, message: "File fetching failed" });
      }
      const filtered = files.filter((name) => name.includes("profilePhoto"))

      if(filtered.length === 0) {
        res.send({status: true, data: null})
      }
      const fileName = filtered[0]
      console.log("filename", fileName)
      console.log("downlaoding",`${dir}/${fileName}` )
      res.send({status: true, data: `${dir}/${fileName}`})
    });
  } else res.send({ status: true, data: null });
  
})




module.exports = router;
