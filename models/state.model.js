const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    title: String
});

const State = new mongoose.model("States", stateSchema)
module.exports = State;