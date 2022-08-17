const express = require('express');
const router = express();
const userExist = require("../../middlewares/userExist");

const { all, info, create, updatebasic, list, logon } = require("../../controlers/user.controler");

// Create new user
router.all("/all", all);
router.all("/:id/info", info);
router.all("/list", all);
router.all("/list/:page", list);
router.all("/list/:page/:limit", list);
router.post("/create", userExist, create);
router.post("/logon", logon);
router.post("/:id/update", updatebasic);

router.all("*", (req, res) => {
    res.status(500).json({ status: 0, err: 0, errMsg: "Invalid User API endpoint", data: {} });
    res.end();
});

module.exports = router;