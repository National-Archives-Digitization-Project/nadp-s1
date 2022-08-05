const express = require('express')
const router = express.Router()
const User = require("../models/users")



router.get('/login', (req, res, next) => {
    res.render("login", {
        title: "Login | NADP Server (I)",
        isConnected: req.session.dbconnected
    })
    next()
})



router.post('/login', async (req, res, next) => {
    const username = req.body.staffNumber
    const password = req.body.password
    User.findOne({ accid: username }, (err, thisUser) => {
        if (err) {
            console.log(err);
        }
        req.session.User = thisUser
        req.session.username = username
        req.session.isLogggedIn = true
        res.redirect('/dashboard')
    })
    next()
})

module.exports = router