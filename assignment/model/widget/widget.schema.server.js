module.exports=function () {
    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
        type: String, enum: ['HTML','IMAGE','YOUTUBE','HEADER','TEXT'],
        name: String,
        text: String,
        placeholder:String,
        description: String,
        url:String,
        width:String,
        height:String,
        rows:Number,
        size:Number,
        class: String,
        icon: String,
        deletable:Boolean,
        formatted: Boolean,
        index:Number,
        dateCreated: Date
    }, {collection: 'assignment.widget'});

    return WidgetSchema;
};