

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const session = require('express-session')
let MongoDBStore = require('connect-mongodb-session')(session);

const dburi = process.env.MONGODB_URI || 'mongodb://localhost:27017/nadpDb'

const dbCon = {};
dbCon.mongoose = mongoose;

dbCon.apiaccess = require("./acces.model");
dbCon.user = require("./user.model");
dbCon.role = require("./role.model");
dbCon.setting = require("./setting.model");
dbCon.archive = require("./archive.model");
dbCon.division = require("./division.model");

dbCon.session = session;

let sessionStore = new MongoDBStore({
    uri: dburi,
    collection: 'sessions'
});
dbCon.store = sessionStore;
dbCon.uri = dburi;

dbCon.ROLES = ["client", "user", "moderator", "admin", "developer"];

dbCon.mongoose.connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


module.exports = dbCon;