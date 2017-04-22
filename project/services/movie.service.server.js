module.exports = function (app, model) {
    app.post("/api/project/movie", addMovie);

    var movieModel = require('../../project/models/movie.model');

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