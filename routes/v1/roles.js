const express = require('express');
const router = express();













router.post("*", (req, res) => {
    res.status(200).json({ status: 0, err: 0, errMsg: "Invalid API endpoint", data: [] })
})
module.exports = router