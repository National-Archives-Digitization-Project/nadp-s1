const mongoose = require('mongoose')
const settingsSchema = new mongoose.Schema({
    app: String,
    debug: {
        type: Boolean,
        default: false
    },
    domain: { type: Array, default: ["localhost"] },
    use_cluster: {
        type: Boolean,
        default: false
    },
    secretKey: {
        type: String,
        default: "ERIrjergneri409403"
    }
}, { timestamps: true })

const Setting = new mongoose.model("Settings", settingsSchema)
module.exports = Setting;