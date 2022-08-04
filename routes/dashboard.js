const express = require('express')
const router = express.Router()

const User = require("../models/users")

router.get('/', (req, res,) => {
    // if (!req.session.isLogggedIn) {
    //      res.redirect('/')
    // }
    let user = User.find({})
        .then((user) => {
            res.render("dashboard", {
                title: "Dashboard",
                user: user
            })
        })
        .catch((err) => {

        })
})

router.get('/logout', (req, res,) => {
    req.session.isLogggedIn = false
    res.redirect('/')
})


module.exports = router