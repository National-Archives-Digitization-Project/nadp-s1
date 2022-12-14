
const dbCon = require("../models");
const bcryptjs = require('bcryptjs');
// Error code 4

exports.all = async (req, res) => {
    await dbCon.user.find({})
        .then((users) => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: users });
        }).catch((err) => {
            res.status(200).json({ status: 1, err: 40, errMsg: err, data: {} });
        })
}

exports.list = async (req, res) => {
    await dbCon.user.paginate({}, {
        page: req.params.page || 1,
        limit: req.params.limit || 100
    }, (err, users) => {
        if (err) {
            res.status(200).json({ status: 1, err: err, errMsg: err.errMsg, data: {} });
        }
        res.status(200).json({ status: 1, err: 0, errMsg: "Success", page: users.page, totalDocs: users.totalDocs, prevPage: users.prevPage, nextPage: users.nextPage, data: users.docs });
    });
}


exports.info = async (req, res) => {
    await dbCon.user.findOne({ _id: req.params.id })
        .then((users) => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: users });
        }).catch((err) => {
            res.status(200).json({ status: 1, err: 41, errMsg: err, data: {} });
        })
}


exports.logon = async (req, res) => {
    const { username, password } = req.body;
    await dbCon.user.findOne({ email: username })
        .then((user) => {
            let isValid = bcryptjs.compareSync(password, user.password)
            if (isValid) {
                res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: user });
            } else {
                res.status(200).json({ status: 0, err: 41, errMsg: "Login details incorrect", data: {} });
            }
        }).catch((err) => {
            res.status(200).json({ status: 1, err: 41, errMsg: err, data: {} });
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
                res.status(500).json({ status: 1, err: 42, errMsg: err, data: {} });
                return;
            }
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: result });
        })
    } else {
        res.status(200).json({ status: 1, err: 43, errMsg: "User email or password exists", data: {} });
    }
}


exports.updatebasic = async (req, res) => {
    const { surname, firstname, mobile } = req.body;
    await dbCon.user.updateOne({ _id: req.params.id }, {
        surname: surname,
        firstname: firstname
    }).then((user) => {
        res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: user });
    }).catch((err) => {
        res.status(200).json({ status: 1, err: 44, errMsg: err.errMsg, data: {} });
    })
}