
const dbCon = require("../models");

exports.findAll = async (req, res) => {
    await dbCon.user.find({})
        .then((users) => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: users });
        }).catch((err) => {
            res.status(200).json({ status: 1, err: 40, errMsg: err, data: {} });
        })
}