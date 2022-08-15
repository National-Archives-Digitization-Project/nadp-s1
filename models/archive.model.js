const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const achiveSchema = new mongoose.Schema({
    title: String,
    reference: Number,
    ref_id: Number
});

achiveSchema.plugin(paginate);
const Archive = new mongoose.model("Archives", achiveSchema)
module.exports = Archive;