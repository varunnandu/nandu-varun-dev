var mongoose = require('mongoose');
var MovieSchema = mongoose.Schema({
        _id: String,
        title: String,
        imageUrl: String
    }, {collection: 'mt_movie'});
module.exports = MovieSchema;