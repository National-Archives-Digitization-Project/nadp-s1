const express = require('express');
const router = express();


router.all("*", (req, res) => {
    res.status(200).json({ status: 0, err: 0, errMsg: "Invalid Request API endpoint", data: {} })
})
module.exports = router