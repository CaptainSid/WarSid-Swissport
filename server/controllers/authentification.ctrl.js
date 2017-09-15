var mongoose=require('mongoose');
var jwt=require('jsonwebtoken');
var bcrypt=require('bcrypt');
const compte=require('../models/compte.model');
import paramValidation from '../../config/param-validation';
import Joi from 'joi';
import config from '../../config/config';
import expressJwt from 'express-jwt';




module.exports.register=function(req,res){

//Vérifier les données envoyer dans le formulaire
Joi.validate(req.body,paramValidation.register,function(err,value){

    if (err === null)
        {
//crypter le mot de passe
        const rounds=10;
        var key=bcrypt.genSaltSync(rounds);
        var mdp_hash=bcrypt.hashSync(req.body.motDePasse,key);
// créer une nouvelle instance
    var nouveauCompte= new compte({
        nom:req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email,
        motDePasse:mdp_hash,
        cle:key,
        sexe:req.body.sexe,
        fonction:req.body.role,
        dateDeNaissance:req.body.dateDeNaissance,
        telephone:req.body.telephone
        });
        //sauvegarder le compte dans la base de données 
        nouveauCompte.save(function(err,user){
            if (err){
                return res.status(400).send({
                    message:err
                });
            } else{
                return res.json(user);
            }
        });
        }
        else{
            res.send(err.message);
        }
});

};

module.exports.login=function(req,res) {
   
//rechercher l'utilisateur dans la BDD 
    compte.findOne({email:req.body.email}).then(
        function(result,err) {
            if ( err) throw err;
            if (!result) {
                res.status('401').send('Authentication failed. User not found.')
            } else{
                const rounds=10;
                var mdp_hash=bcrypt.hashSync(req.body.motDePasse,result.cle);
//Vérifier si le mot de passe est correct
              if (mdp_hash != result.motDePasse) {
                  res.status('401').send('Authentication failed. Wrong password.')
              } else {
                const token = jwt.sign({
                    id: result._id
                  }, config.jwtSecret, {
                    expiresIn: '12h'
                  });
                return res.json({
                    token,
                    result
                  });
                
              }
            }
        });
      
};
  


module.exports.logedIn=function() {
    return expressJwt({
      secret: config.jwtSecret,
      requestProperty: 'jwtCompte'
    });
};

