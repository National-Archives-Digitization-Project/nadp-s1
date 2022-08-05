const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    accid: {
        type: String,
        unique: true
    },
    email: String,
    mobile: String,
    password: String,
    surename: String,
    firstname: String,
    enabled: {
        type: Boolean,
        default: false
    }
})

const User = new mongoose.model("User", userSchema)
module.exports = User;