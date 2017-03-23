var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    name: String,
    description: String,
    title: String,
    dateCreated: Date,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
    _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}
},{collection: 'assignment.page'});

module.exports = pageSchema;