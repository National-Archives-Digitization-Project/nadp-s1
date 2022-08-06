const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    mobile: {
        type: String,
        unique: true
    },
    password: String,
    surname: String,
    firstname: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            default: "client"
        }
    ],
    enabled: {
        type: Boolean,
        default: false
    }
})

const User = new mongoose.model("Users", userSchema)
module.exports = User;