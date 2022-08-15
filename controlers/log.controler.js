
const dbCon = require("../models");
// Error code 9

exports.all = async (req, res) => {
    await dbCon.log.find({})
        .then((logs) => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: logs });
        }).catch((err) => {
            res.status(500).json({ status: 0, err: 90, errMsg: err, data: {} });
        })
}

exports.list = async (req, res) => {
    await dbCon.log.paginate({}, {
        page: req.params.page || 1,
        limit: req.params.limit || 100
    }, (err, logs) => {
        if (err) {
            res.status(500).json({ status: 0, err: 91, errMsg: err.errMsg, data: {} });
        }
        res.status(200).json({ status: 1, err: 0, errMsg: "Success", page: logs.page, totalDocs: logs.totalDocs, prevPage: logs.prevPage, nextPage: logs.nextPage, data: logs.docs });
    });
}


exports.info = async (req, res) => {
    await dbCon.log.findOne({ _id: req.params.id })
        .then((logs) => {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: logs });
        }).catch((err) => {
            res.status(500).json({ status: 0, err: 93, errMsg: err, data: {} });
        })
}


exports.create = async (req, res) => {
    const { log, userId } = req.body;
    const Di = dbCon.mongoose.Types.ObjectId(userId);
    await new dbCon.log({
        log: log,
        user: Di
    }).save((err, result) => {
        if (err) {
            res.status(500).json({ status: 0, err: 40, errMsg: err, data: {} });
            return;
        }
        res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: result });
    })
}