
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


exports.list = async (req, res) => {
    console.log(`${req.params.page} - ${req.params.limit}`)
    await dbCon.log.paginate({}, {
        page: req.params.page || 1,
        limit: req.params.limit || 100
    }, (err, logs) => {
        if (err) {
            res.status(200).json({ status: 1, err: err, errMsg: err.errMsg, data: {} });
        }
        res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: logs });
    });
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
    const Di = dbCon.mongoose.Types.ObjectId('62f8330cf9bd515ee17057d2');
    await new dbCon.log({
        log: log,
        user: Di
    }).save((err, result) => {
        if (err) {
            res.status(500).json({ status: 1, err: 40, errMsg: err, data: {} });
            return;
        }
        res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: result });
    })
}