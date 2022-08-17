const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: String,
    divisions: [
        { name: String }
    ]
}, { timestamps: true });

const State = new mongoose.model("states", stateSchema)
module.exports = State;