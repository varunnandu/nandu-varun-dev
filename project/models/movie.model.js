var q = require('q');
var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server.js');
var movieModel = mongoose.model('MovieModel', movieSchema);

movieModel.addMovie = addMovie;
movieModel.findMovieByMovieId = findMovieByMovieId;
movieModel.findAllLikedMovies = findAllLikedMovies;
module.exports = movieModel;



    function addMovie(movie) {
        var newMovie = {
            "title": movie.title,
            "plot": movie.overview,
            "imageUrl": movie.imageUrl
        };

        return movieModel.findOneAndUpdate({_id: movie.id.toString()}, newMovie, {upsert: true});
    }

    function findMovieByMovieId(movieId) {
            return movieModel.findById(movieId);
    }

    function findAllLikedMovies(movieIds) {
        return movieModel.find({_id: {$in: movieIds}});
    }
