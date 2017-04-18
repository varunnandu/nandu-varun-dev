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
            "imageUrl": movie.imageUrl
        };

        return MovieModel.findOneAndUpdate({_id: movie.id.toString()}, newMovie, {upsert: true});
    }

    function findMovieByMovieId(movieId) {
        return MovieModel.findById(movieId);
    }

    function findAllLikedMovies(movieIds) {
        return MovieModel.find({_id: {$in: movieIds}});
    }
