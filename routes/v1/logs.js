const express = require('express');
const router = express();
const { all, info, create, list } = require("../../controlers/log.controler")

router.all("/all", all);
router.all("/:id/info", info)
router.all("/list", all);
router.all("/list/:page", list);
router.all("/list/:page/:limit", list);
router.post("/create", create);

router.all("*", (req, res) => {
    res.status(401).json({ status: 0, err: 0, errMsg: "Invalid Log API endpoint", data: {} })
})
module.exports = router