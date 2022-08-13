const express = require('express');
const router = express();







router.all("*", (req, res) => {
    res.status(401).json({ status: 0, err: 0, errMsg: "Invalid Division API endpoint", data: {} })
})
module.exports = router