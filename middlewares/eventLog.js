

const dbCon = require("../models");
eventLog = async (req, res, next) => {
    const userId = req.body.user || null;
    if (userId === null) {
        next();
    } else {
        console.log(userId)
        next();
    }
}

module.exports = eventLog;