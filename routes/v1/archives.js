const express = require('express');
const router = express();
const dbCon = require("../../models")


router.get("/all", async (req, res) => {
    await dbCon.archive.find({})
        .then(doc => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: doc })
        }).catch((err) => {
            res.status(200).json({ status: 0, err: 1, errMsg: "Failed", data: {} })
        })
})


router.post("/create", async (req, res) => {
    console.log(req.body)
    res.status(200).json({ status: 0, err: 1, errMsg: "Failed", data: {} })
})


router.all("*", (req, res) => {
    res.status(200).json({ status: 0, err: 0, errMsg: "Invalid Data API endpoint", data: {} })
})
module.exports = router