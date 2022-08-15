

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const session = require('express-session')
let MongoDBStore = require('connect-mongodb-session')(session);

const dburi = process.env.MONGODB_URI || 'mongodb://localhost:27017/nadpDb'

const Redis = require('ioredis');
const redis = new Redis({
    port: Number.parseInt(process.env.REDIS_PORT) || 6379, // Redis port
    host: process.env.REDIS_HOST || "127.0.0.1", // Redis host
    username: process.env.REDIS_USERNAME || "default", // needs Redis >= 6
    password: process.env.REDIS_PASSWORD || "my-top-secret",
    db: 0,
    retryStrategy: times => Math.min(times * 50, 2000)
});

//Mongoose Connection Check
const setup = require('../utils/setup');
mongoose.connection.on('open', () => {
    console.log('Db Connected!')
    setup(dbCon)
});
mongoose.connection.on('error', (err) => {
    console.log('Db failed to connect!')
});
//Mongoose Connection Check

//Redis Connection Check
redis.on('connect', () => {
    console.log('Redis Connected!')
});
redis.on('error', (err) => {
    console.log('Redis failed to connect!')
});
//Redis Connection Check

const dbCon = {};
dbCon.mongoose = mongoose;
dbCon.redis = redis;

dbCon.log = require("./log.model");
dbCon.apiaccess = require("./apiacces.model");
dbCon.user = require("./user.model");
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
dbCon.mongoose.connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


module.exports = dbCon;