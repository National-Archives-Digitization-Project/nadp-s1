
const dbCon = require("../models");
// Error code 9

exports.all = async (req, res) => {
    await dbCon.log.find({})
        .then((logs) => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: logs });
        }).catch((err) => {
            res.status(200).json({ status: 1, err: 90, errMsg: err, data: {} });
        })
}

exports.info = async (req, res) => {
    await dbCon.log.find({ _id: req.params.id })
        .then((logs) => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: logs });
        }).catch((err) => {
            res.status(200).json({ status: 1, err: 91, errMsg: err, data: {} });
        })
}


exports.create = async (req, res) => {
    const { log, userId } = req.body;
    await new dbCon.log({
        log: log,
        user: userId
    }).save((err, result) => {
        if (err) {
            res.status(500).json({ status: 1, err: 40, errMsg: err, data: {} });
            return;
        }
        res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: result });
    })
}