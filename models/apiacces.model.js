const mongoose = require('mongoose')
const apiaccesSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    uri: {
        type: String,
        unique: true
    },
    api_key: {
        type: String,
        required: true,
        unique: true
    },
    whitelisted: {
        type: Boolean,
        default: false
    }
})

const ApiAccess = new mongoose.model("API_access", apiaccesSchema)
module.exports = ApiAccess;