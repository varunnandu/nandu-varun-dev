var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
    name: String,
    description: String,
    dateCreated: Date,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
},{collection: 'assignment.website'});

module.exports = websiteSchema;