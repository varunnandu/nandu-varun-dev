var q = require('q');
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('projectUserModel', userSchema);

userModel.createUser = createUser;
userModel.findAllUsers = findAllUsers;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUserById = deleteUserById;
userModel.likeMovie = likeMovie;
userModel.undoLikeMovie = undoLikeMovie;
userModel.isMovieLiked = isMovieLiked;
module.exports = userModel;

function findAllUsers() {
    var d = q.defer();
    userModel.find(function (err, data){
        if(err) {
            d.reject(err);
        } else {
            d.resolve(data);
        }
    });
}

function likeMovie(userId, movieId) {
    var d = q.defer();
    userModel.update({_id: userId}, {$addToSet: {likes: movieId}}, function (err, data){
        if(err) {
            d.reject(err);
        } else {
            d.resolve(data);
        }
    });
}

function undoLikeMovie(userId, movieId) {
    var d = q.defer();
     userModel.update({_id: userId}, {$pullAll: {likes: [movieId]}}, function (err, data){
        if(err) {
            d.reject(err);
        } else {
            d.resolve(data);
        }
    });
}

function isMovieLiked(userId, movieId) {
    var d = q.defer();
    userModel.findOne({_id: userId, likes: {$in: [movieId]}}, function (err, data){
        if(err) {
            d.reject(err);
        } else {
            d.resolve(data);
        }
    });
}

function findUserByCredentials (username, password){
    var d = q.defer();
    userModel
        .find({username:username}, {password:password}, function (err, data){
            if(err) {
                d.reject(err);
            } else {
                d.resolve(data);
            }
        });
    return d.promise;

}
function findUserByUsername(username){
    var d = q.defer();
    userModel
        .find({username: username}, function (err, data) {
            if(err) {
                d.reject(err);
            } else {
                console.log(data);
                d.resolve(data);
            }
        });
    return d.promise;

}

function findUserById(userId){
    var d = q.defer();
    userModel
        .findOne({_id: userId}, function (err, data) {
            if(err) {
                d.reject(err);
            } else {
                d.resolve(data);
            }
        });
    return d.promise;

}


function  deleteUserById(userId) {
    var d = q.defer();
    userModel
        .remove({_id: userId}, function (err, data) {
        if(err){
            d.reject(err);
        }
        else {
            d.resolve(data);
        }
    });
    return d.promise;

}

function createUser(user) {
    var deffered = q.defer();
    userModel
        .create(user, function (err, data) {
            if(err){
                deffered.reject(err);
            }
            else {
                deffered.resolve(data);
            }
        });
    return deffered.promise;
}

function updateUser(userId, user){
    var d = q.defer();
    userModel
        .update({_id: userId}, {$set: user},  function (err, data) {
            if(err){
                d.reject(err);
            }
            else {
                d.resolve(data);
            }
        });
    return d.promise;

}
