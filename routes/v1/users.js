const express = require('express');
const router = express();
const { authJwt, verifySignUp } = require('../../middlewares')
const dbCon = require('../../models')

let User = dbCon.user;


router.post("/login", authJwt.verifyToken, (req, res) => {
    let header = req.headers
})

router.all("*", (req, res) => {
    res.status(200).json({ status: 0, err: 0, errMsg: "Invalid User API endpoint", data: [] })
})
module.exports = router