const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const usersRouter = require('./routes/users');
const applicationRouter = require('./routes/application');
const questionRouter = require("./routes/question")
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5000
const mongoUri = process.env.mongoUri

//routes
app.use('/users', usersRouter);
app.use('/application', applicationRouter)
app.use('/question', questionRouter)

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, () => {
  console.log("mongo db connection successful")
})

app.listen(port, () => {
  console.log(`Server started at port: ${port}`)
})





module.exports = app;
