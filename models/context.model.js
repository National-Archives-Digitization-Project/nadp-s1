
const mongoose = require('mongoose');
const contextSchema = new mongoose.Schema({
    context: {
        type: String
    },
    apps: { type: Array, default: [] }
}, { timestamps: true });

const Context = new mongoose.model("context", contextSchema);
module.exports = Context;