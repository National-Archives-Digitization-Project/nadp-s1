const express = require('express')
const router = express.Router()

router.get('/', (req, res,) => {
    res.render("dashboard", {
        user: req.session.User
    })
})

router.get('/users', (req, res,) => {
    console.log(req.session.User)
    res.render("users", {
        title: req.title,
        user: req.session.User
    })
})

router.get('/logout', (req, res,) => {
    req.session.destroy();
    res.redirect('/')
})

module.exports = router