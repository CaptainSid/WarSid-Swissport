var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
const compte=require('../models/compte.model');
const plan = require('../models/planning.model');
import config from '../../config/config';



module.exports.login=function(req,res) {

 //rechercher l'utilisateur dans la BDD 
     compte.findOne({email:req.body.email}).then( // faire la recherche dans la collection agent
         function(result,err) {
             if ( err) throw err;
             if (!result) {
                
                return res.json({message:'Authentication failed. User not found.'});
             } else{
                 var mdp_hash=bcrypt.hashSync(req.body.password,result.cle);
 //Vérifier si le mot de passe est correct
               if (mdp_hash != result.motDePasse) {
               
                   return res.json({message:'Authentication failed. Wrong password.'});

               } else {
               
                 return res.json({result,message:'success'});
               }
             }
         });
       
 };


 module.exports.checkUser=function(req,res){
    compte.findOne({email:req.body.email}).then( // faire la recherche dans la collection agent
        function(result,err) {
            if (!result || err) {
               
               return res.json({message:'User not found.'});
            } else{
            return res.json({result,message:'success'});
            }
        });

 };


 module.exports.changeMdp=function(req,res){
compte.findOne({email:req.body.email}).then(function(result,err){
    if (!result || err){
        return res.json({message:"Erreur serveur"});
    }else{
        var mdp_hash=bcrypt.hashSync(req.body.motDePasse,result.cle);
        if (mdp_hash != result.motDePasse)
            {
                return res.json({message:"L'ancien mot de passe que vous avez introduit est faux"});                
            }else{
                var newpass=bcrypt.hashSync(req.body.nvMotDePasse,result.cle);
                var newValues = { motDePasse: newpass };
                
                var x=compte.findOneAndUpdate({email:req.body.email},newValues,{ returnNewDocument: true }).then(function(res,err){
                        if (err) throw err;
                        return res;
                });
                res.json({message:"Votre mot de passe a été changer"});
            }
        
    }
});
};


module.exports.getPlanning=function(req,res){

    var planning = plan.findOne({ annee: req.body.annee, mois: req.body.mois }).then(
        function (result, err) {
            if (err) res.json({message:"Le planning que vous cherchez n'existe pas dans la Base de données"});
            var plan=result.planning.find(x => x.matricule===req.body.matricule);
            res.json({planning:plan,message:"success"});            
        });

};