const mongoose = require('mongoose')
const apiaccesSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    apiKey: {
        type: String,
        required: true,
        unique: true
    },
    apiSecret: {
        type: String,
        required: true,
        unique: true
    },
    uris: { type: Array, default: ["*"] }
}, { timestamps: true })

const ApiAccess = new mongoose.model("API_access", apiaccesSchema)
module.exports = ApiAccess;