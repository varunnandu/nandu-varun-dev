module.exports = function (app) {


    var userModel = require('./model/user/user.model.server');




    var model = {
        userModel: userModel
    }

    require ('./services/user.service.server')(app, model);

    };