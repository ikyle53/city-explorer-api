'use strict';

//Reuqired's *************************************************
const express = require('express');
require('dotenv').config();

let data = require('./data/weather.json');

//Uses *******************************************************
const app = express();
const PORT = process.env.PORT || 3002;

//Routes *****************************************************
app.get('/', (request, response) => {
    response.send('heyyyy');
})

//API Endpoint /weather for lat, lon, and searchQuery
app.get('/weather', (request, response) => {
    let lon = request.query.lon;
    // let lat = request.query.lat;
    // let searchQuery = request.query.searchQuery
    let dataToSend = data.find(item => item.lon === lon);
    let newWeather = new Forecast(dataToSend);
    console.log(newWeather);
    response.send(newWeather);
})

//Catch all for invalid requests
app.get('*', (request, response) => {
    response.send('Looks like youre trying to request something I dont have')
})

//Error handles **********************************************
class Forecast {
    constructor(weatherObject) {
        this.date = weatherObject.date;
        this.description = weatherObject.description;
    }
}

//Listens ****************************************************
app.listen(PORT, () => console.log(`listening on port ${PORT}`));