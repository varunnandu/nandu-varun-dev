var q = require('q');
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('projectUserModel', userSchema);

userModel.createUser = createUser;
userModel.findAllUsers = findAllUsers;
userModel.findUserById = findUserById;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUserById = deleteUserById;
userModel.likeMovie = likeMovie;
userModel.undoLikeMovie = undoLikeMovie;
userModel.isMovieLiked = isMovieLiked;
module.exports = userModel;

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function findAllUsers() {
    return userModel.find();
}

function likeMovie(userId, movieId) {
    return userModel.update({_id: userId}, {$addToSet: {likes: movieId}});
}

function undoLikeMovie(userId, movieId) {
   return userModel.update({_id: userId}, {$pullAll: {likes: [movieId]}});
}

function isMovieLiked(userId, movieId) {
    return userModel.findOne({_id: userId, likes: {$in: [movieId]}});
}

function findUserByCredentials (username, password){
    return userModel.findOne({username:username}, {password:password});
}

function findUserByUsername(username){
    return userModel.findOne({username: username});


}

function findUserById(userId){
    return userModel.findOne({_id: userId});

}


function  deleteUserById(userId) {
    return userModel.remove({_id: userId});
}

function createUser(user) {
    return userModel.create(user);
}

function updateUser(userId, user){
    return userModel.update({_id: userId}, {$set: user});

}
