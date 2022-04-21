'use strict';

//Reuqired's *************************************************
const express = require('express');
const cors = require('cors');
const axios = require('axios');
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
app.get('/weather', async(request, response) => {
let city = request.query.city;
let lat = request.query.lat;
let lon = request.query.lon;
let url = `http://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}&lat=${lat}&long=${lon}&units=I&days=3`;
let results = await axios.get(url);
let weatherArray = results.data.data.map(item => new WeatherReport(item));

response.status(200).send(weatherArray);
})

app.get('/movie', async(request, response) => {
    let location = request.query.city;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${location}&page=1&include_adult=false`;
    let results = await axios.get(url);
    let movieArray = results.data.results.map(item => new Movie(item));
    response.status(200).send(movieArray);
    console.log(results.data);
})

//Classes ****************************************************
class WeatherReport {
    constructor(items) {
        this.date = items.datetime;
        this.description = items.weather.description;
    }
}

class Movie {
    constructor(items) {
        this.name = items.original_title;
    }
}


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