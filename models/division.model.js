const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const divisionSchema = new mongoose.Schema({
    name: String,
    shorname: {
        type: String,
        unique: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "states"
    },
    province: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "provinces"
    }
}, { timestamps: true });

divisionSchema.plugin(paginate);
const Division = new mongoose.model("divisions", divisionSchema)
module.exports = Division;