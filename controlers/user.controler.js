
const dbCon = require("../models");
const bcryptjs = require('bcryptjs');

exports.all = async (req, res) => {
    await dbCon.user.find({})
        .then((users) => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: users });
        }).catch((err) => {
            res.status(200).json({ status: 1, err: 40, errMsg: err, data: {} });
        })
}

exports.info = async (req, res) => {
    await dbCon.user.find({ _id: req.params.id })
        .then((users) => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: users });
        }).catch((err) => {
            res.status(200).json({ status: 1, err: 40, errMsg: err, data: {} });
        })
}


exports.create = async (req, res) => {
    const { surname, firstname, email, mobile, password } = req.body;
    if (!req.hasEmail) {
        await new dbCon.user({
            surname: surname,
            firstname: firstname,
            email: email.toLowerCase(),
            mobile: mobile,
            password: bcryptjs.hashSync(password, 10)
        }).save((err, result) => {
            if (err) {
                res.status(500).json({ status: 1, err: 40, errMsg: err, data: {} });
                return;
            }
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: result });
        })
    } else {
        res.status(200).json({ status: 1, err: 40, errMsg: "User email or password exists", data: {} });
    }
}


exports.updatebasic = async (req, res) => {
    const { surname, firstname, mobile } = req.body;
    await dbCon.user.updateOne({ _id: req.params.id }, {
        surname: surname,
        firstname: firstname
    })
        .then((user) => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: user });
        }).catch((err) => {
            res.status(200).json({ status: 1, err: 40, errMsg: err.errMsg, data: {} });
        })
}
