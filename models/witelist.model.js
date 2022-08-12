const mongoose = require('mongoose')
const domainSchema = new mongoose.Schema({
    uri: {
        type: String,
        unique: true
    },
    whitelisted: {
        type: Boolean,
        default: true
    }
})

const Domain = new mongoose.model("Domains", domainSchema)
module.exports = Domain;