'use strict';

//Reuqired's *************************************************
const express = require('express');
const cors = require('cors');
const getMovies = require('./modules/MovieBackend.js');
const getWeather = require('./modules/WeatherBackend.js');
require('dotenv').config();

//Uses *******************************************************
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

//Routes *****************************************************


//Startup page ************
app.get('/', (request, response) => response.send('heyyyy'));


//WeatherBit request *****
app.get('/weather', getWeather);


//Movie request ************
app.get('/movie', getMovies);


//Classes ****************************************************


//Error handles **********************************************

//Catch all for invalid requests
app.get('*', (request, response) => response.send('Looks like youre trying to request something I dont have'));

//Listens ****************************************************
app.listen(PORT, () => console.log(`listening on port ${PORT}`));