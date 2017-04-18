"use strict";
module.exports = function (app, movieModel) {
    app.post("/api/project/movie", addMovie);

    function addMovie(req, res) {
        var movie = req.body;
        movieModel
            .addMovie(movie)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}