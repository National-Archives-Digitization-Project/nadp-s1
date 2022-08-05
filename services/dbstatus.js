
const { mongoose } = require("./database")
mongoose.connection
    .on('open', () => {
        let connected = true
        module.exports = connected
    })
    .on('error', (err) => {
        let connected = false
        module.exports = connected
    });
