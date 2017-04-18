"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (assignmentUserModel, projectUserModel) {
    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));
    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var api = {
        getPassport: getPassport
    };

    return api;

    function assignmentLocalStrategy(username, password, done) {
        console.log(username, password);
        assignmentUserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log(user);
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function projectLocalStrategy(username, password, done) {
        console.log(username, password);
        projectUserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log(user);
                    if (user && password == user.password) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if (user.type == "assignment") {
            assignmentUserModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
        else if (user.type == "project") {
            projectUserModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
    }

    function getPassport() {
        return passport;
    }
};