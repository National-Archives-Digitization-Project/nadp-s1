const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    title: String
}, { timestamps: true });

const State = new mongoose.model("States", stateSchema)
module.exports = State;