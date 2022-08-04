const mongoose = require('mongoose')

const session = require('express-session')
let MongoDBStore = require('connect-mongodb-session')(session);

const dburi = process.env.DATABASE || 'mongodb://localhost:27017/nadpDb'
mongoose.connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let sessionStore = new MongoDBStore({
    uri: dburi,
    collection: 'sessions'
});

session.connected = false;
mongoose.connection
    .on('open', () => {
        session.connected = true;
        console.log('Db Connected!')
    })
    .on('error', (err) => { });


module.exports = {
    session,
    sessionStore
}