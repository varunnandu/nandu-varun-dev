
var q = require('q');
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server.js');
var userModel = mongoose.model('userModel', userSchema);

userModel.findAllUsers = findAllUsers;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.deleteUserById = deleteUserById;
userModel.likeMovie = likeMovie;
userModel.undoLikeMovie = undoLikeMovie;
userModel.isMovieLiked = isMovieLiked;
userModel.following = following;
userModel.followers = followers;
userModel.removeFollowing = removeFollowing;
userModel.removeFollowers = removeFollowers;
userModel.isAlreadyFollowing = isAlreadyFollowing;
userModel.findAllFollowingUsers = findAllFollowingUsers;
userModel.findAllFollowersUsers = findAllFollowersUsers;
module.exports = userModel;


        function findAllUsers() {
            return UserModel.find();
        }

        function findUserById(userId) {
            return UserModel.findById(userId);
        }

        function findUserByUsername(username) {
            return UserModel.findOne({username: username});
        }

        function findUserByCredentials(credentials) {
            return UserModel.findOne(
                {
                    username: credentials.username,
                    password: credentials.password
                }
            );
        }

        function createUser(user) {
            return UserModel.create(user);
        }

        function updateUser(userId, user) {
            delete user._id;
            return UserModel.update({_id: userId}, {$set: user});
        }

        function deleteUserById(userId) {
            return UserModel.remove({_id: userId});
        }

        function likeMovie(userId, movieId) {
            return UserModel.update({_id: userId}, {$addToSet: {likes: movieId}});
        }

        function undoLikeMovie(userId, movieId) {
            return UserModel.update({_id: userId}, {$pullAll: {likes: [movieId]}});
        }

        function isMovieLiked(userId, movieId) {
            return UserModel.findOne({_id: userId, likes: {$in: [movieId]}});
        }

        function following(loggedInUserId, navigateUserId) {
            return UserModel.update({_id: loggedInUserId}, {$addToSet: {following: navigateUserId}});
        }

        function followers(navigateUserId, loggedInUserId) {
            return UserModel.update({_id: navigateUserId}, {$addToSet: {followers: loggedInUserId}});
        }

        function removeFollowing(loggedInUserId, navigateUserId) {
            return UserModel.update({_id: loggedInUserId}, {$pullAll: {following: [navigateUserId]}});
        }

        function removeFollowers(navigateUserId, loggedInUserId) {
            return UserModel.update({_id: navigateUserId}, {$pullAll: {followers: [loggedInUserId]}});
        }

        function isAlreadyFollowing(loggedInUserId, navigateUserId) {
            return UserModel.findOne({_id: loggedInUserId, following: {$in: [navigateUserId]}});
        }

        function findAllFollowingUsers(userIds) {
            return UserModel.find({_id: {$in: userIds}});
        }

        function findAllFollowersUsers(userIds) {
            return UserModel.find({_id: {$in: userIds}});
        }