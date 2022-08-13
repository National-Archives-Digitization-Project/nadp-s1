const dbCon = require("../models");
const User = dbCon.user;

checkDuplicateEmail = async (req, res, next) => {
    // Verify Email
    await User.findOne({
        email: req.body.email
    }).then((user)=>{
       req.hasEmail = false
       if(user){
            req.hasEmail = true
        }
        return next()
    }).catch((err)=>{
        req.hasEmail = false
        return next()
    })
}

module.exports = checkDuplicateEmail