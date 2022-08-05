const express = require('express')
const router = express.Router()
const User = require("../models/users")

router.get('/', (req, res,) => {
    if (!req.session.isLogggedIn) {
        res.redirect('/')
    }
    res.render("dashboard", {
        title: "Dashboard",
        user: req.session.thisUser
    })
})

router.get('/logout', (req, res,) => {
    req.session.isLogggedIn = false
    res.redirect('/')
})

module.exports = router