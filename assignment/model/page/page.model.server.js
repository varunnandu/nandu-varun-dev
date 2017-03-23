var q = require('q');
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js');
var pageModel = mongoose.model('PageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
module.exports = pageModel;

function createPage (websiteId, page){
    page._website = websiteId;
    var d = q.defer();
    pageModel
        .create(page, function (err, data) {
            if(err){
                d.reject(err);
            }
            else {

                d.resolve(data);
            }
        });
    return d.promise;

}

function findAllPagesForWebsite(websiteId){
    var d = q.defer();
    pageModel
        .find({_website: websiteId}, function (err, data) {
            if(err){
                d.reject(err);
            }
            else {

                d.resolve(data);
            }
        });
    return d.promise;


}

function findPageById(pageId){
    var d = q.defer();
    pageModel
        .findOne({_id: pageId}, function (err, data) {
            if(err){
                d.reject(err);
            }
            else {

                d.resolve(data);
            }
        });
    return d.promise;

}

function updatePage(pageId, page){
    var d = q.defer();
    pageModel
        .update({_id: pageId}, {$set: page},  function (err, data) {
            if(err){
                d.reject(err);
            }
            else {
                d.resolve(data);
            }
        });
    return d.promise;

}

function deletePage(pageId){
    var d = q.defer();
    pageModel
        .remove({_id: pageId}, function (err, data) {
            if(err){
                d.reject(err);
            }
            else {
                d.resolve(data);
            }
        });
    return d.promise;

}
