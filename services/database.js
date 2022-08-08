const mongoose = require('mongoose')
const session = require('express-session')
let MongoDBStore = require('connect-mongodb-session')(session);

const dburi = process.env.MONGODB_URI || 'mongodb://localhost:27017/NADPDB'
mongoose.connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let sessionStore = new MongoDBStore({
    uri: dburi,
    collection: 'sessions'
});

const connection = mongoose.connection
    .on('open', () => {
        console.log('Db Connected!')
    })
    .on('error', (err) => {
        console.log('Db failed to connect!')
    });

module.exports = {
    mongoose,
    connection,
    session,
    sessionStore
}