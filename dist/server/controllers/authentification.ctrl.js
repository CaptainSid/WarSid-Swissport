'use strict';

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _auth = require('../routes/auth.route');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var compte = require('../models/compte.model');


module.exports.register = function (req, res) {

    //Vérifier les données envoyer dans le formulaire
    _joi2.default.validate(req.body, _paramValidation2.default.register, function (err, value) {

        if (err === null) {
            //crypter le mot de passe
            var rounds = 10;
            var key = bcrypt.genSaltSync(rounds);
            var mdp_hash = bcrypt.hashSync(req.body.motDePasse, key);
            // créer une nouvelle instance
            var nouveauCompte = new compte({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                motDePasse: mdp_hash,
                cle: key,
                sexe: req.body.sexe,
                fonction: req.body.role,
                dateDeNaissance: req.body.dateDeNaissance,
                telephone: req.body.telephone
            });
            //sauvegarder le compte dans la base de données 
            nouveauCompte.save(function (err, user) {
                if (err) {
                    return res.status(400).send({
                        message: err
                    });
                } else {
                    return res.json(user);
                }
            });
        } else {
            res.send(err.message);
        }
    });
};

module.exports.login = function (req, res) {

    //rechercher l'utilisateur dans la BDD 
    compte.findOne({ email: req.body.email }).then(function (result, err) {
        if (err) throw err;
        if (!result) {
            res.status('401').send('Authentication failed. User not found.');
        } else {
            var rounds = 10;
            var mdp_hash = bcrypt.hashSync(req.body.motDePasse, result.cle);
            //Vérifier si le mot de passe est correct
            if (mdp_hash != result.motDePasse) {
                res.status('401').send('Authentication failed. Wrong password.');
            } else {
                var token = jwt.sign({
                    id: result._id
                }, _config2.default.jwtSecret, {
                    expiresIn: '1h'
                });
                return res.json({
                    token: token,
                    result: result
                });
            }
        }
    });
};

module.exports.logedIn = function () {
    return (0, _expressJwt2.default)({
        secret: _config2.default.jwtSecret,
        requestProperty: 'jwtCompte'
    });
};
/** je teste  !! 
//  module de profile 
module.exports.profile=function(req,res) {
    nouveauCompte.send
    
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
                     expiresIn: '1h'
                   });
                 return res.json({
                     token,
                     result
                   });
                 
               }
             }
         });
       
   }; **/
//# sourceMappingURL=authentification.ctrl.js.map
