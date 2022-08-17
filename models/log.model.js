const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const logSchema = new mongoose.Schema({
    log: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }
}, { timestamps: { type: Date, index: true, default: Date.now, expires: '1d' } });

logSchema.plugin(paginate);

const Log = new mongoose.model("logs", logSchema);
module.exports = Log;