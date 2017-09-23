var mongoose=require('mongoose');
const allMessageSchema= new mongoose.Schema({
    text:String
  });
  
  module.exports = mongoose.model('allMessage', allMessageSchema);