const express = require('express')
const router = express.Router()

router.get('/', (req, res,) => {
    res.render("dashboard")
})

router.get('/users', (req, res,) => {
    res.render("users")
})

router.get('/logout', (req, res,) => {
    req.session.destroy();
    res.redirect('/')
})

router.get('*', (req, res) => {
    res.render('404', {
        title: "NADP (I) - Page not found"
    })
})

module.exports = router