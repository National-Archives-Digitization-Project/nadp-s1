const jwt = require("jsonwebtoken");
const secret = process.env.AUTH_KEY || "delta1201"

const dbCon = require("../models");
const User = dbCon.user;
const Role = dbCon.role;

verifyToken = (req, res, next) => {
    let token = req.cookies['x-access-token'];
    if (!token) {
        req.verified = false
        res.redirect("/login")
        return next()
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            req.verified = false
            res.redirect("/login")
            return next()
        }
        req.verified = true
        return next()
    });
};

isClient = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    });
};




const authJwt = {
    verifyToken,
    isClient
};


module.exports = authJwt;