const express = require('express')
const router = express.Router()
const dbCon = require("../models")
const bcrypt = require("bcryptjs")

router.get('/', (req, res) => {
    res.render("dashboard")
})

router.get('/users',
    (req, res, next) => {
        dbCon.user.find({}, (err, users) => {
            if (err) {
                res.locals.users = []
                return next();
            }
            res.locals.users = users
            return next();
        })
    },
    (req, res) => {
        res.render("dashboard/users")
    })



router.get('/add-user', (req, res) => {
    res.render("dashboard/adduser")
})

router.post('/users/add-user',
    (req, res, next) => {
        let { fn, sn, email, mobile, password } = req.body;
        let newUser = new dbCon.user({
            firstname: fn,
            surname: sn,
            email: email,
            mobile: mobile,
            password: bcrypt.hashSync(password, 8)
        });
        newUser.save((err, doc) => {
            if (err) {
                req.added = false;
                return next()
            }
            req.added = true
            return next()
        })
    },
    (req, res) => {
        if (req.added) res.redirect("/dashboard/users")
    })



router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

router.get('*', (req, res) => {
    res.render('404', {
        title: "NADP (I) - Page not found"
    })
})

module.exports = router