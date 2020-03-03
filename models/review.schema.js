var mongoose = require('mongoose');
// Reviews Schema
var reviewSchema = new mongoose.Schema({
    reviewMsg : {type:Array, required:true, trim:true},
    reviewDate : Date,
    prodId : String,
    },
    { collection : 'reviewSchemas'});

module.exports = mongoose.model('reviews',reviewSchema);