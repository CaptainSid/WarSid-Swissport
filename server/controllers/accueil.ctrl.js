var mongoose=require('mongoose');
const compte=require('../models/compte.model');
const compteAg=require('../models/compteAg.model');


/* accueil  pour l'administrateur et le planificateur */
module.exports.accueil=function(req,res) {
    
    var x=[];
     x=compte.find({fonction:req.params.fonction}).then(function(persone,err){
        if ( (persone.length)>0 ){
            
          return persone;
        
        }else{
      
          res.redirect('/api/echec');
        
         }
    
      });
      
      return x;
     
};
/* accueil pour la liste des agent */
module.exports.accueilAg=function(req,res) {
  
  var z=[];
   z=compteAg.find({fonction:req.params.fonction}).then(function(personeAg,err){
      if ( (personeAg.length)>0 ){
          
        return personeAg;
     
      }else{
    
        res.redirect('/api/echec');
        
        
       }
  
    });
    
    return z;
   
};

