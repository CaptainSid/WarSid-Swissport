var mongoose=require('mongoose');
const codeShiftSchema= new mongoose.Schema({
  allCodes:[{
    code:String,
    heureDebut:String,
    heureFin:String
  }]

  });
  
  module.exports = mongoose.model('codeShift', codeShiftSchema);