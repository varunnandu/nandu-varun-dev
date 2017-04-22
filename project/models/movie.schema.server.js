var mongoose = require('mongoose');
var MovieSchema = mongoose.Schema({
        _id: String,
        plot:String,
        title: String,
        imageUrl: String
    }, {collection: 'project.movie'});
module.exports = MovieSchema;