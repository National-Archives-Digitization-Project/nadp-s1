

const dbCon = require("../models");

eventLog = async (req, res, next) => {
    res.on('finish', (status) => {
        console.log(status)
        next();
    })
}

module.exports = eventLog;