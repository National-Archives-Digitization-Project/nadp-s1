const jwt = require("jsonwebtoken");
const secret = process.env.AUTH_KEY || "delta1201"


const dbCon = require("../models");
const User = dbCon.user;
const Role = dbCon.role;


verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

isClient = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        // Role.find(
        //     {
        //         _id: { $in: user.roles }
        //     },
        //     (err, roles) => {
        //         if (err) {
        //             res.status(500).send({ message: err });
        //             return;
        //         }
        //         for (let i = 0; i < roles.length; i++) {
        //             if (roles[i].name === "admin") {
        //                 next();
        //                 return;
        //             }
        //         }
        //         res.status(403).send({ message: "Require Admin Role!" });
        //         return;
        //     }
        // );
    });
};

const authJwt = {
    verifyToken,
    isClient
};


module.exports = authJwt;