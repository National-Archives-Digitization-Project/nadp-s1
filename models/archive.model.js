const mongoose = require('mongoose')
const achiveSchema = new mongoose.Schema({
    title: String,
    reference: Number,
    ref_id: Number
})

const Archive = new mongoose.model("Archives", achiveSchema)
module.exports = Archive;