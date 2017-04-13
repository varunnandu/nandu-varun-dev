var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName:{type: String, required: true},
    email: String,
    kindof: {type: String, enum: ['Admin', 'Regular'], required: true},
    phone: String,
    dateCreated: {type:Date, default:Date.now},
    movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'}]
},{collection: 'project.user'});

module.exports = userSchema;