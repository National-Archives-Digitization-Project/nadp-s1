const mongoose = require('mongoose')
const roleSchema = new mongoose.Schema({
    name: String,
    whitelist: String
})

const Role = new mongoose.model("Roles", roleSchema)
module.exports = Role;