const express = require('express')
const router = express.Router()

router.get('/', (req, res,) => {
    res.render("dashboard", {
        title: `${req.session.User.surname} ${req.session.User.firstname} - NADP Dashboard`,
        user: req.session.User
    })
})

router.get('/logout', (req, res,) => {
    req.session.destroy();
    res.redirect('/')
})

module.exports = router