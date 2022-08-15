const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const divisionSchema = new mongoose.Schema({
    title: String,
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "States"
    }
}, { timestamps: true });

divisionSchema.plugin(paginate);
const Division = new mongoose.model("Divisions", divisionSchema)
module.exports = Division;