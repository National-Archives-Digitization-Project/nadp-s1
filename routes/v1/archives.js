const express = require('express');
const router = express();
const dbCon = require("../../models");




router.all("*", (req, res) => {
    res.status(401).json({ status: 0, err: 0, errMsg: "Invalid Data API endpoint", data: {} });
});
module.exports = router;