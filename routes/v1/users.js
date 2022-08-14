const express = require('express');
const router = express();
const dbCon = require("../../models");
const userExist = require("../../middlewares/userExist");

const { all, info, create, update } = require("../../controlers/user.controler")

// Error code 4
// Create new user
router.get("/all", all);
router.get("/:id/info", info)
router.post("/create", userExist, create)
router.post("/:id/update", update)

router.all("*", (req, res) => {
    res.status(500).json({ status: 0, err: 0, errMsg: "Invalid User API endpoint", data: {} });
    res.end();
})

module.exports = router