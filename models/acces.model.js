const mongoose = require('mongoose')
const accesSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    api_key: {
        type: String,
        required: true,
        unique: true
    }
})

const ApiAccess = new mongoose.model("API_access", accesSchema)
module.exports = ApiAccess;