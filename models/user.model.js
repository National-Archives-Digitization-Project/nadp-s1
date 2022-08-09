const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'images/faces/face1.jpg'
    },
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
            ref: "Roles"
        }
    ],
    token: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: false
    }
})

const User = new mongoose.model("Users", userSchema)
module.exports = User;