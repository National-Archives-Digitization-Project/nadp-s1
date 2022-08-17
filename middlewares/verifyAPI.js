const jwt = require("jsonwebtoken");
const dbCon = require("../models");

verifyAPIRequests = async (req, res, next) => {
    const secret = process.env.SALT_SECRET || "delta1201";
    const headers = req.headers;
    const apiToken = headers['x-api-key'];
    if (typeof apiToken == 'undefined') {
        res.status(500).json({ status: 0, err: 1, errMsg: "Unauthorized API access: Wrong APIKEY" });
        res.end();
    } else {
        await dbCon.apiaccess.findOne({ apiSecret: apiToken })
            .then((api) => {
                jwt.verify(api.apiSecret, secret, (err, decoded) => {
                    if (err) { }
                    if (decoded.apiKey == api.apiKey) {
                        next();
                    } else {
                        res.status(500).json({ status: 0, err: 1, errMsg: "Unauthorized API access: Wrong APIKEY" });
                        res.end();
                    }
                })
            }).catch((err) => {
                res.status(500).json({ status: 0, err: 1, errMsg: "Unauthorized API access: Wrong APIKEY" });
                res.end();
            });
    }
}

module.exports = verifyAPIRequests;