const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const secret = process.env.AUTH_KEY || "delta1201"

const setup = (dbCon) => {
    dbCon.role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new dbCon.role({
                name: "client"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'client' to roles collection");
            });
            new dbCon.role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new dbCon.role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });
            new dbCon.role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
            new dbCon.role({
                name: "owner"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'owner' to roles collection");
            });
        }
    });

    dbCon.user.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            jwt.sign({ email: "info@golojan.com", mobile: "2348068573376" }, secret, (err, token) => {
                new dbCon.user({
                    email: 'info@golojan.com',
                    mobile: '2348068573376',
                    password: bcrypt.hashSync('admin', 8),
                    surname: 'Agu',
                    firstname: 'Chux',
                    token: token,
                    enabled: true
                }).save((err, user) => {
                    if (err) {
                        console.log("error", err);
                    }
                });
                nUser.token = token
            });
        }
    });

    dbCon.setting.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            // initialise settings //
            new dbCon.setting({
                debug: true,
            })
        }
    });

    dbCon.apiaccess.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            // initialise settings //
            new dbCon.apiaccess({
                debug: true,
            })
        }
    });
}

module.exports = setup