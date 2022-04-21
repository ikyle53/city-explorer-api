'use strict';
const axios = require('axios');

//Weather request function ************************************************
async function getWeather(request, response, next) {
    try {
        let city = request.query.city;
        let lat = request.query.lat;
        let lon = request.query.lon;
        let url = `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}&lat=${lat}&long=${lon}&units=I&days=3`;
        console.log(url);
        let results = await axios.get(url);
        let weatherArray = results.data.data.map(item => new WeatherReport(item));
        response.status(200).send(weatherArray);
    } catch (error) {
        Promise.resolve().then(() => {
            throw new Error(error.message);
        }).catch(next);
    }
};

//Class ******************************************************************
class WeatherReport {
    constructor(items) {
        this.date = items.datetime;
        this.description = items.weather.description;
    }
}

module.exports = getWeather;