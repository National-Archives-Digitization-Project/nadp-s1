const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    accid: String,
    surename: String,
    firstname: String
})

const User = new mongoose.model("User", userSchema)
module.exports = User;