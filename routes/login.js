const express = require('express')
const router = express.Router()

router.post('/login', (req, res, next) => {
    const username = req.body.staffNumber
    const password = req.body.password
    if (username === 'admin' && password === 'admin') {
        req.session.username = username
        req.session.save((err) => {
            if (err) console.log(err)
        })
    }
    res.redirect('/dashboard')
    next()
})

module.exports = router