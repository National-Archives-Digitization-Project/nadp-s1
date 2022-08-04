const mydate = require('date-and-time');
let date = (format) => {
    let now = new Date()
    return mydate.format(now, format)
}
module.exports = date