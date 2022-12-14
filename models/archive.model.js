const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const achiveSchema = new mongoose.Schema({
    title: String,
    reference: Number,
    ref_id: Number
}, { timestamps: true });

achiveSchema.plugin(paginate);
const Archive = new mongoose.model("archives", achiveSchema)
module.exports = Archive;