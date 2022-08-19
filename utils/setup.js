const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const secret = process.env.SALT_SECRET || "delta1201"
const { generateApiKey } = require('generate-api-key');


const setup = (dbCon) => {

    dbCon.apiaccess.estimatedDocumentCount((err, count) => {
        const newKey = generateApiKey({ method: 'base32' });
        if (!err && count === 0) {
            jwt.sign({ email: "info@golojan.com", apiKey: newKey }, secret, (err, token) => {
                new dbCon.apiaccess({
                    name: 'Agu Chux',
                    email: 'info@golojan.com',
                    apiKey: newKey,
                    apiSecret: token
                }).save((err, api) => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log(`new API ${token} token has been added`);
                });
            });
        }
    });


    dbCon.user.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
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
        }
    });

    dbCon.setting.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            // initialise settings //
            new dbCon.setting({
                app: "NADProject",
                debug: true,
                domain: "localhost"
            }).save((err, setting) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'setting' to settings collection");
            });
        }
    });

    dbCon.setting.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {

            // initialise state //
            new dbCon.state({
                name: "Abuja FCT"
            }).save((err, state) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'Abuja FCT' to states collection");
            });

            new dbCon.state({
                name: "Enugu"
            }).save((err, state) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'Enugu' to states collection");
            });

            new dbCon.state({
                name: "Ibadan"
            }).save((err, state) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'Ibadan' to states collection");
            });

            new dbCon.state({
                name: "Kaduna"
            }).save((err, state) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'Kaduna' to states collection");
            });

        }
    });

}

module.exports = setup