const express = require('express');
const router = express();
const dbCon = require("../../models");
const userExist = require("../../middlewares/userExist");
const bcryptjs = require('bcryptjs');
const secrete = process.env.SALT_SECRET || "delta1201"
//Create new user
router.post("/create", userExist, async (req, res) => {
    const { surname, firstname, email, mobile, password } = req.body;
    if (req.hasEmail) {
        res.status(200).json({ status: 1, err: 10, errMsg: "User email or password exists", data: {} })
        res.end();
    }
    await new dbCon.user({
        surname: surname,
        firstname: firstname,
        email: email.toLowerCase(),
        mobile: mobile,
        password: bcryptjs.hashSync(password, 10)
    }).save((err, user) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: user })
            res.end();
        }
    })
})

router.all("*", (req, res) => {
    res.status(200).json({ status: 0, err: 0, errMsg: "Invalid User API endpoint", data: {} });
    res.end();
})
module.exports = router