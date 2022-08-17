const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const provinceSchema = new mongoose.Schema({
    name: String,
    shorname: {
        type: String,
        unique: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "States"
    }
}, { timestamps: true });

provinceSchema.plugin(paginate);
const Province = new mongoose.model("provinces", provinceSchema)
module.exports = Province;