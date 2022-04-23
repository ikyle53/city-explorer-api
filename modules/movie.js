'use strict';
const axios = require('axios');
let cache = require('./cache.js');
module.exports = getMovie;



async function getMovie(city) {
    const key = 'movie-' + city;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
        console.log('Cache hit');
    } else {
        console.log('Cache miss'); 
        cache[key] = {};
        cache[key].timestamp = Date.now();
        // console.log(await axios.get(url));
        // return;
        cache[key].data = await axios.get(url)
            .then(response => parseMovie(response.data));
    }
    return cache[key].data;
}

function parseMovie(movieData) {
    try {
        const movieSummaries = movieData.results.map(item => {
            return new Movie(item);
        });
        return Promise.resolve(movieSummaries);
    } catch (e) {
        return Promise.reject(e);
    }
}

class Movie {
    constructor(items) {
        let url = 'https://image.tmdb.org/t/p/w500';
        this.name = items.original_title;
        this.image = url+items.poster_path;
        this.overview = items.overview;
        this.vote = items.vote_average;
    }
}