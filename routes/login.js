const express = require('express')
const router = express.Router()
const User = require("../models/user.model")
const checkDuplicateEmail = require("../middlewares/verifySignUp")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const secret = process.env.AUTH_KEY || "delta1201"

router.get('/', (req, res) => {
    res.render("login", {
        title: "Login | NADP Server (I)"
    })
})

router.post('/signin', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({
        email: email
    }).then((user) => {
        if (user) {
            var passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );
            if (passwordIsValid) {
                let token = jwt.sign({ id: user.id }, secret, {
                    expiresIn: 86400 // 24 hours
                });
                let options = {
                    path: "/",
                    sameSite: true,
                    maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
                    httpOnly: true, // The cookie only accessible by the web server
                }
                res.cookie("x-access-token", token, options);

                req.session.token = token;
                req.session.User = user;
                req.session.isLogggedIn = true
                res.redirect("/dashboard")
            } else {
                res.redirect("/login")
            }
        } else {
            res.redirect("/login")
        }
    }).catch((err) => { res.redirect("/login") })
})

module.exports = router