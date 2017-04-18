var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        imgUrl: String,
        phone: String,
        likes: [String],
        followers: [String],
        following: [String],
        roles: {type: String, default: "user", enum: ["user", "admin"]},
        type: {type: String, default: "project"}
    }, {collection: 'mt_user'});
module.exports = userSchema;