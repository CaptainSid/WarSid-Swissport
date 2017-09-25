const allMsg=require('../models/allMessages.model');


module.exports.getAllMessages=function(req,res){
    var m=allMsg.find().sort({_id:-1}).then(function(result,err){
        if (err) throw err;
        return result;
    });
    return m;
}


module.exports.supprimerMessage= function (req, res) {
    
      var x = allMsg.findOneAndRemove({ _id: req.params.id }).then(function (err) {
        if (err) {
    
          res.send(err.message);
    
        }
    
      });
    
      return x;
    
    };