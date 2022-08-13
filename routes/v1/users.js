const express = require('express');
const router = express();
const dbCon = require("../../models");
const userExist = require("../../middlewares/userExist");
const bcryptjs = require('bcryptjs');

const { findAll } = require("../../controlers/user.controler")

// Error code 4
// Create new user

router.get("/all", findAll);

router.get("/:id/info", async (req, res) => {
    await dbCon.user.find({ _id: req.params.id })
        .then((users) => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: users });
        }).catch((err) => {
            res.status(200).json({ status: 1, err: 40, errMsg: err, data: {} });
        })
})


router.post("/create", userExist, async (req, res) => {
    const { surname, firstname, email, mobile, password } = req.body;
    if (!req.hasEmail) {
        await new dbCon.user({
            surname: surname,
            firstname: firstname,
            email: email.toLowerCase(),
            mobile: mobile,
            password: bcryptjs.hashSync(password, 10)
        }).save((err, result) => {
            if (err) {
                res.status(500).json({ status: 1, err: 40, errMsg: err, data: {} });
                return;
            }
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: result });
        })
    } else {
        res.status(200).json({ status: 1, err: 40, errMsg: "User email or password exists", data: {} });
    }
})



router.post("/:id/update", async (req, res) => {
    const { surname, firstname, email, mobile, password } = req.body;


    await dbCon.user.updateOne({ _id: req.params.id })
        .then((users) => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: users });
        }).catch((err) => {
            res.status(200).json({ status: 1, err: 40, errMsg: err, data: {} });
        })
})





router.all("*", (req, res) => {
    res.status(500).json({ status: 0, err: 0, errMsg: "Invalid User API endpoint", data: {} });
    res.end();
})

module.exports = router