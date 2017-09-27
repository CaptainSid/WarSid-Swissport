var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const compte = require('../models/compteAg.model');
const plan = require('../models/planning.model');
const codeShift = require('../models/codeShift.model');
import config from '../../config/config';



module.exports.login = function (req, res) {

    //rechercher l'utilisateur dans la BDD 
    compte.findOne({ email: req.body.email }).then( // faire la recherche dans la collection agent
        function (result, err) {
            if (err) throw err;
            if (!result) {

                return res.json({ message: 'Authentication failed. User not found.' });
            } else {
                var mdp_hash = bcrypt.hashSync(req.body.password, result.cle);
                //Vérifier si le mot de passe est correct
                if (mdp_hash != result.motDePasse) {

                    return res.json({ message: 'Authentication failed. Wrong password.' });

                } else {

                    return res.json({ result, message: 'success' });
                }
            }
        });

};


module.exports.checkUser = function (req, res) {
    compte.findOne({ email: req.body.email }).then( // faire la recherche dans la collection agent
        function (result, err) {
            if (!result || err) {

                return res.json({ message: 'User not found.' });
            } else {
                return res.json({ result, message: 'success' });
            }
        });

};




module.exports.changeMdp = function (req, res) {
    compte.findOne({ email: req.body.email }).then(function (result, err) {
        if (!result || err) {
            return res.json({ message: "Erreur serveur" });
        } else {
            var mdp_hash = bcrypt.hashSync(req.body.motDePasse, result.cle);
            if (mdp_hash != result.motDePasse) {
                return res.json({ message: "L'ancien mot de passe que vous avez introduit est faux" });
            } else {
                var newpass = bcrypt.hashSync(req.body.nvMotDePasse, result.cle);
                var newValues = { motDePasse: newpass };

                var x = compte.findOneAndUpdate({ email: req.body.email }, newValues, { returnNewDocument: true }).then(function (res, err) {
                    if (err) throw err;
                    return res;
                });
                res.json({ message: "Votre mot de passe a été changer" });
            }

        }
    });
};

module.exports.getPlanning = function (req, res) {
    console.log("matricule send is ",req.body.matricule);
    var myPlannings = [];
    myPlannings = plan.find().then(
        function (result, err) {
            if (err) throw err;
            if (result) {
                var resultat=[];
                for (var i = 0; i < result.length; i++) {
                    var buffer = result[i].planning.find(x => x.matricule === req.body.matricule);
                    if (buffer){
                        var mois=result[i].mois;
                        var annee=result[i].annee;
                        var agentPlan = [];
                        for (var j = 0; j < 31; j++) {
                            var tmp = j + 1;
                            var index = "jour" + tmp;
                            // console.log(index + " = " + plan[index]);
                            agentPlan[j] = buffer[index];
                        }
                        resultat.push({mois:mois,annee:annee,planning:agentPlan});
                    }
                }
                if (resultat.length!=0){
                    res.json({ result: resultat, message: "success" });                
                }else{
                    res.json({message: "no plannings found"});               
                }
            }
            else{
                res.json({message: "no plannings found"});
            }
        });
}

module.exports.getAllCodes = function (req, res) {
    var tableau = codeShift.find().then(
        function (result, err) {
            if (err) throw err;
            if (result) {
                res.json({ result: result[0], message: "success" });   
            }
            else {
                res.json({message: "no plannings found"})             
            }

        });
};
