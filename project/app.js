module.exports = function (app) {


    var userModel = require('./models/user.model.server');
    var movieModel = require('./models/movie.model.server');
    var reviewModel = require('./models/review.model.server');


    var model = {
        userModel: userModel,
        movieModel: movieModel,
        reviewModel: reviewModel
    }

    require ('./services/user.service.server')(app, model);
    require ('./services/movie.service.server')(app, model);
    require ('./services/review.service.server')(app, model);
};