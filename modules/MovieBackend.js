'use strict';
const axios = require('axios');

//Movie request function ************************************************
async function getMovies(request, response, next) {
    try {
        let location = request.query.city;
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${location}&page=1&include_adult=false`;
        let results = await axios.get(url);
        let movieArray = results.data.results.map(item => new Movie(item));
        response.status(200).send(movieArray);
        console.log(results.data);
    } catch (error) {
        Promise.resolve().then(() => {
            throw new Error(error.message);
        }).catch(next);
    }
};

//Class ******************************************************************
class Movie {
    constructor(items) {
        this.name = items.original_title;
    }
}

module.exports = getMovies;

