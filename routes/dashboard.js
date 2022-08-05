const express = require('express')
const router = express.Router()
const User = require("../models/users")

router.get('/', (req, res,) => {
    if (!req.session.isLogggedIn) {
        res.redirect('/')
    }

    User.findOne({ accid: req.session.username }, (err, thisUser) => {
        console.log(thisUser);
        if (err) {
            console.log(err);
        }
        res.render("dashboard", {
            title: "Dashboard",
            user: req.session.thisUser
        })
    })
})

router.get('/logout', (req, res,) => {
    req.session.isLogggedIn = false
    res.redirect('/')
})

module.exports = router