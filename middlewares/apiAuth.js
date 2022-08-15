const jwt = require("jsonwebtoken");
const secret = process.env.AUTH_KEY || "delta1201"

const dbCon = require("../models");
const User = dbCon.user;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        req.verified = false
        return next()
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            req.verified = false
            return next()
        }
        req.verified = true
        console.log(decoded)
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