const express = require("express")
const router = express.Router()
const User = require('../models/User')
const Question = require('../models/Question')
const Application = require('../models/Application')

router.post("/add", (req, res) => {
    const {email, appId, question, answer} = req.body

    User.findOne({email})
    .then(user => {
        if(user) {
            const newQuestion = new Question({question, answer, addedBy: user})
            newQuestion.save()
            .then(() => {
                //add question to the application
                Application.findById(appId)
                .then(app => {
                    app.questions = [...app.questions, newQuestion]
                    app.save()
                    .then(() => {
                        res.send({status: true, data: app.questions})
                    })
                    .catch(err => res.status(400).send({status: false, message: 'Question could not get added'}))
                })
            })
        }
        else {
            res.status(400).send({status: false, message: 'Question could not get added'})
        }
    })
})



module.exports = router