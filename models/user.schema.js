var mongoose = require('mongoose');

// Registeration user schema
var userSchema = new mongoose.Schema({
    firstName: { type:String, required: true}  ,
    lastName: { type:String, required: true },
    email: { type:String, required: true },
    password: { type:String, required:true },
  }, { collection : 'registerSchemas'});

  module.exports = mongoose.model('users',userSchema);
