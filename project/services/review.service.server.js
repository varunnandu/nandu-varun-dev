"use strict";

var q = require('q');
module.exports = function (app, model) {
    app.get("/api/project/movie/:movieId/reviews", findAllReviewsByMovieId);
    app.post("/api/project/user/:userId/movie/:movieId", addReview);
    app.put("/api/project/movie/:movieId/review/:reviewId", updateReview);
    app.delete("/api/project/movie/:movieId/review/:reviewId", deleteReview);
    app.get("/api/project/user/:userId/reviews", findAllReviewsByUserId);

    var reviewModel = require('../../project/models/review.model');
    var movieModel = require('../../project/models/movie.model');

    function findAllReviewsByMovieId(req, res) {
        var movieId = req.params.movieId;
        reviewModel
            .findAllReviewsByMovieId(movieId)
            .then(
                function (reviews) {
                    res.json(reviews);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addReview(req, res) {
        var userId = req.params.userId;
        var movieId = req.params.movieId;
        var review = req.body;
        reviewModel
            .addReview(userId, movieId, review)
            .then(
                function (review) {
                    res.json(review);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review = req.body;
        reviewModel
            .updateReview(reviewId, review)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        reviewModel
            .deleteReview(reviewId)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllReviewsByUserId(req, res) {
        var reqUserId = req.params.userId;
        reviewModel
            .findAllReviewsByUserId(reqUserId)
            .then(
                function (reviews) {
                    var promiseArray = [];
                    var result = [];

                    reviews.forEach(function (element, index, array) {
                        promiseArray
                            .push(
                                movieModel
                                    .findMovieByMovieId(element.movieId)
                                    .then(
                                        function (movie) {
                                            if (movie) {
                                                var jsonString = JSON.stringify(element);
                                                var jsonStringNew = jsonString;
                                                var review = JSON.parse(jsonStringNew);
                                                review.movie = movie;
                                                result.push(review);
                                            }
                                        },
                                        function (err) {
                                            console.log(err);
                                        })
                            );
                    });

                    q.all(promiseArray).then(function () {
                        res.json(result);
                    });
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}