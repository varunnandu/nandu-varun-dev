var q = require('q');
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server.js');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
module.exports = websiteModel;

function createWebsiteForUser (userId, website){
    website._user = userId;
    var d = q.defer();
    websiteModel
        .create(website, function (err, data) {
            if(err){
                d.reject(err);
            }
            else {

                d.resolve(data);
            }
        });
    return d.promise;

}

function findAllWebsitesForUser(userId){
    var d = q.defer();
    websiteModel
        .find({_user: userId}, function (err, data) {
            if(err){
                d.reject(err);
            }
            else {

                d.resolve(data);
            }
        });
    return d.promise;


}

function findWebsiteById(websiteId){
    var d = q.defer();
    websiteModel
        .findOne({_id: websiteId}, function (err, data) {
            if(err){
                d.reject(err);
            }
            else {

                d.resolve(data);
            }
        });
    return d.promise;

}

function updateWebsite(websiteId, website){
    var d = q.defer();
    websiteModel
        .update({_id: websiteId}, {$set: website},  function (err, data) {
            if(err){
                d.reject(err);
            }
            else {
                d.resolve(data);
            }
        });
    return d.promise;

}

function deleteWebsite(websiteId){
    var d = q.defer();
    websiteModel
        .remove({_id: websiteId}, function (err, data) {
            if(err){
                d.reject(err);
            }
            else {
                d.resolve(data);
            }
        });
    return d.promise;

}
