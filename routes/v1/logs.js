const express = require('express');
const router = express();
const { all, info, create, list } = require("../../controlers/log.controler")

router.all("/all", all);
router.all("/list", all);
router.all("/list/:page", list);
router.all("/list/:page/:limit", list);

router.all("/:id/info", info);
router.post("/create", create);

// 62ee73533b46ddace89fc683

router.all("*", (req, res) => {
    res.status(401).json({ status: 0, err: 0, errMsg: "Invalid Log API endpoint", data: {} })
})
module.exports = router