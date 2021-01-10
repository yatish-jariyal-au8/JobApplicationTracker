const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
const multer = require("multer")

const usersRouter = require('./routes/users');
const applicationRouter = require('./routes/application');
const questionRouter = require("./routes/question")
const profileRouter = require("./routes/profile")
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileupload())
app.use(multer({dest: './routes/uploads/', rename: (filename, fieldname) => filename}).any())

const port = process.env.PORT || 5000
const mongoUri = process.env.mongoUri

//routes
app.use('/users', usersRouter);
app.use('/application', applicationRouter)
app.use('/question', questionRouter)
app.use('/profile', profileRouter)

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, () => {
  console.log("mongo db connection successful")
})

app.listen(port, () => {
  console.log(`Server started at port: ${port}`)
})





module.exports = app;
