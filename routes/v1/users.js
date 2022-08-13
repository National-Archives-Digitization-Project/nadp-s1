const express = require('express');
const router = express();
const dbCon = require("../../models");
const userExist = require("../../middlewares/userExist");
const bcryptjs = require('bcryptjs');

// Error code 4
// Create new user

router.all("/all", async (req, res) => {
    new dbCon.user.find({})
        .then((users) => {
            res.status(401).json({ status: 1, err: 0, errMsg: "Success", data: users });
        }).catch((err) => {
            res.status(200).json({ status: 1, err: 40, errMsg: "Error listing users", data: {} });
        })
})


router.post("/create", userExist, (req, res) => {
    const { surname, firstname, email, mobile, password } = req.body;
    if (!req.hasEmail) {
        new dbCon.user({
            surname: surname,
            firstname: firstname,
            email: email.toLowerCase(),
            mobile: mobile,
            password: bcryptjs.hashSync(password, 10)
        }).save((err, user) => {
            if (err) {
                res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: user })
            } else {
                res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: user })
            }
        })
    }
    res.status(200).json({ status: 1, err: 40, errMsg: "User email or password exists", data: {} });
})

router.all("*", (req, res) => {
    res.status(401).json({ status: 0, err: 0, errMsg: "Invalid User API endpoint", data: {} });
    res.end();
})
module.exports = router