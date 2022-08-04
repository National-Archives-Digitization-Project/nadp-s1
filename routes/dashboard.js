const express = require('express')
const router = express.Router()
const date = require('../utils/Date');

router.get('/', (req, res,) => {
    // if (!req.session.isLogggedIn) {
    //     res.redirect('/')
    // }
    res.render("dashboard", {
        title: "Dashboard",
        thisday: date('MMM DD, YYYY')
    })
})





router.get('/logout', (req, res,) => {
    req.session.isLogggedIn = false
    res.redirect('/')
})


module.exports = router