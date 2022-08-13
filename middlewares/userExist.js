const dbCon = require("../models");
const User = dbCon.user;

userExist = async (req, res, next) => {
    // Verify Email
    await User.findOne({
        email: req.body.email.toLowerCase()
    }).then((user) => {
        req.hasEmail = false;
        if (user) {
            req.hasEmail = true;
            //Check Mobile
            User.findOne({
                mobile: req.body.mobile
            }).then((user) => {
                if (user) {
                    req.hasEmail = true;
                }
                return next();
            }).catch((err) => {
                req.hasEmail = false;
                return next();
            })
            //Check Mobile
        }
        return next()
    }).catch((err) => {
        req.hasEmail = false
        return next()
    })
}

module.exports = userExist