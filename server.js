'use strict';

//Reuqired *************************************************
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./modules/weather.js');
const movie = require('./modules/movie.js');


//Uses *******************************************************
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

//Routes *****************************************************   
app.get('/', (request, response) => response.send('Welcome to my server!'));   

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
    const { lat, lon } = request.query;
    weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!')
    });
  } 
 
app.get('/movie', movieHandler);

function movieHandler(request, response) {
    const { city } = request.query;
    movie(city)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!')
    });
  } 

//Classes ****************************************************


//Error handles **********************************************
app.get('*', (request, response) => response.send('Looks like youre trying to request something I dont have'));
app.listen(PORT, () => console.log(`Server up on ${process.env.PORT}`));
