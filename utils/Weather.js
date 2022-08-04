const weather = require('weather-js');

module.exports = {
    getWeather: (search, degreeType) => {
        global.myData = null;
        weather.find({ search: search, degreeType: degreeType }, (err, result) => {
            if (err) console.log(err);
            global.myData = JSON.stringify(result, null, 2)
        });
        return global.myData
    }
};