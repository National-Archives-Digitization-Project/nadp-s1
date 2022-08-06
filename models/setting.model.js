const mongoose = require('mongoose')
const settingsSchema = new mongoose.Schema({
    app: String,
    debug: {
        type: Boolean,
        default: false
    },
    domain: String
})

const Setting = new mongoose.model("Settings", settingsSchema)
module.exports = Setting;