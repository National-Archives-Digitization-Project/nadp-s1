const express = require('express');
const router = express();


router.post("/login", (req, res) => {
    const { username, password } = req.body;
    res.status(200).json({ result: 200, data: [{ username: 'Okey', password: 'delta1201' }], err: 1, errMsg: 'Success' })
})
module.exports = router