const express = require('express')
const router = express.Router()

router.get('/', (req, res,) => {
    // if (!req.session.isLogggedIn) {
    //      res.redirect('/')
    // }
    res.render("../dashboard", {
        title: "Dashboard"
    })
})

router.get('/logout', (req, res,) => {
    req.session.isLogggedIn = false
    res.redirect('/')
})


module.exports = router