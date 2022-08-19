const express = require('express');
const router = express();
const { set, get } = require("../../controlers/context.controler");

router.post("/set", set);
router.get("/get", get);

router.all("*", (req, res) => {
    res.status(401).json({ status: 0, err: 0, errMsg: "Invalid Log API endpoint", data: {} });
});

module.exports = router;