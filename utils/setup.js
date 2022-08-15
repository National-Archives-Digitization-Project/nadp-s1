const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const secret = process.env.AUTH_KEY || "delta1201"

const setup = (dbCon) => {
    dbCon.user.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            jwt.sign({ email: "info@golojan.com", mobile: "2348068573376" }, secret, (err, token) => {
                new dbCon.user({
                    email: 'info@golojan.com',
                    mobile: '2348068573376',
                    password: bcrypt.hashSync('admin', 8),
                    surname: 'Agu',
                    firstname: 'Chux',
                    enabled: true
                }).save((err, user) => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("added 'info@golojan.com' to users collection");
                });
                nUser.token = token
            });
        }
    });

    dbCon.setting.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            // initialise settings //
            new dbCon.setting({
                app: "NADProject",
                debug: true,
                domain: "localhost"
            }).save((err, settings) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'setting' to settings collection");
            });
        }
    });
}

module.exports = setup