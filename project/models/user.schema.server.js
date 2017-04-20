var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    imgUrl: String,
    phone: String,
    likes: [String],
    roles: {type: String, default: "user", enum: ["user", "admin"]}
},{collection: 'project.user'});

module.exports = UserSchema;