
const dbCon = require("../models");
// Error code

exports.get = async (req, res) => {
    const dbCon = require("../models");
    const id = dbCon.mongoose.Types.ObjectId(req.body.id || 1);
    await dbCon.context.findOne({ _id: id })
        .then((context) => {
            if (!context) {
                new dbCon.context({
                    context: ''
                }).save((err, result) => {
                    if (err) {
                        res.status(500).json({ status: 0, err: 1, errMsg: err, data: {} });
                        return;
                    }
                    res.status(200).json({ status: 1, err: 0, errMsg: "Success", id: result._id, context: result.context, apps: result.apps });
                })
            } else {
                res.status(200).json({ status: 1, err: 0, errMsg: "Success", id: context._id, context: context.context, apps: context.apps });
            }
        }).catch((err) => {
            res.status(500).json({ status: 0, err: 1, errMsg: err, data: {} });
        })
}

exports.set = async (req, res) => {
    const { log, userId } = req.body;
    const Di = dbCon.mongoose.Types.ObjectId(userId);
    await new dbCon.context({
        log: log,
        user: Di
    }).save((err, result) => {
        if (err) {
            res.status(500).json({ status: 0, err: 40, errMsg: err, data: {} });
            return;
        } else {
            res.status(200).json({ status: 1, err: 0, errMsg: "Success", data: result });
        }
    })
}