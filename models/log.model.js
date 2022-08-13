const mongoose = require('mongoose')
const logSchema = new mongoose.Schema({
    log: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    stamp: {
        type: Date,
        default: Date.now()
    }
})

const Log = new mongoose.model("Logs", logSchema)
module.exports = Log;