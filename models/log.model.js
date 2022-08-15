const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

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
});

logSchema.plugin(paginate);

const Log = new mongoose.model("Logs", logSchema);
module.exports = Log;