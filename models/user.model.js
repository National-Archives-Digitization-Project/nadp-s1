const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'images/faces/face1.jpg'
    },
    surname: String,
    firstname: String,
    email: {
        type: String,
        unique: true
    },
    mobile: {
        type: String,
        unique: true
    },
    password: String,
    roles: {
        type: Array,
        default: ["user"]
    },
    enabled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

userSchema.plugin(paginate);

const User = new mongoose.model("users", userSchema)
module.exports = User;