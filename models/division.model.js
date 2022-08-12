const mongoose = require('mongoose')
const divisionSchema = new mongoose.Schema({
    title: String,
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "States"
    }
})

const Division = new mongoose.model("Divisions", divisionSchema)
module.exports = Division;