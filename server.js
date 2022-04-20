'use strict';

//Reuqired's *************************************************
const express = require('express');
const cors = require('cors');
require('dotenv').config();

let data = require('./data/weather.json');

//Uses *******************************************************
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
//Routes *****************************************************
app.get('/', (request, response) => {
    response.send('heyyyy');
})

//API Endpoint /weather for lat, lon, and searchQuery
app.get('/weather', (request, response) => {
    // let lon = request.query.lon;
    // let lat = request.query.lat;
    let city = request.query.city;
    let dataToSend = data.find(item => item.city_name === city);
    let newWeather = dataToSend.data.map((day) => new Forecast(day.datetime, day.weather.description));
    console.log(dataToSend);
    response.send(newWeather);
})

//Catch all for invalid requests
app.get('*', (request, response) => {
    response.send('Looks like youre trying to request something I dont have');
})

//Error handles **********************************************
class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

//Listens ****************************************************
app.listen(PORT, () => console.log(`listening on port ${PORT}`));