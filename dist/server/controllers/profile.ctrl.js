'use strict';

var mongoose = require('mongoose');
var compte = require('../models/compte.model');
var compteAg = require('../models/compteAg.model');
var bcrypt = require('bcrypt');

/* pour trouver un compte un administrateur ou planificateur */

module.exports.profile = function (req, res) {

  var x = compte.findOne({ _id: req.params.id }).then(function (persone, err) {
    if (persone) {

      return persone;
    } else {

      res.redirect('/api/echec');
    }
  });

  return x;
};

/* pour trouver un compte agent */
module.exports.profileAg = function (req, res) {

  var z = compteAg.findOne({ _id: req.params.id }).then(function (persone, err) {
    if (persone) {

      return persone;
    } else {

      res.redirect('/api/echec');
    }
  });

  return z;
};

/* supprimer un compte administrateur ou planificateur */
module.exports.supprimerProfil = function (req, res) {

  var x = compte.findOneAndRemove({ _id: req.params.id }).then(function (err) {
    if (err) {

      res.send(err.message);
    }
  });

  return x;
};

/* supprimer un profil Agent */
module.exports.supprimerProfilAg = function (req, res) {

  var x = compteAg.findOneAndRemove({ _id: req.params.id }).then(function (err) {
    if (err) {

      res.send(err.message);
    }
  });

  return x;
};

/* modifier un profil administrateur  */
module.exports.mProfilAd = function (req, res) {

  var z = compte.findOne({ _id: req.params.id }).then(function (persone, err) {
    if (persone) {

      return persone;
    } else {

      res.redirect('/api/echec');
    }
  });

  return z;
};

/* modifier un profil planificateur */
module.exports.mProfilPl = function (req, res) {

  var z = compte.findOne({ _id: req.params.id }).then(function (persone, err) {
    if (persone) {

      return persone;
    } else {

      res.redirect('/api/echec');
    }
  });

  return z;
};

/* modifier un profil Agent */
module.exports.mProfilAg = function (req, res) {

  var z = compteAg.findOne({ _id: req.params.id }).then(function (persone, err) {
    if (persone) {

      return persone;
    } else {

      res.redirect('/api/echec');
    }
  });

  return z;
};

/* pour sauvegarde la modification d'un administrateur */
module.exports.sauvModifProfilAd = function (req, res) {
  var rounds = 10;
  var key = bcrypt.genSaltSync(rounds);
  var mdp_hash = bcrypt.hashSync(req.body.motDePasse, key);

  var newValues = { nom: req.body.nom, prenom: req.body.prenom, email: req.body.email, telephone: req.body.telephone, sexe: req.body.sexe, dateDeNaissance: req.body.dateDeNaissance, motDePasse: mdp_hash, cle: key, fonction: req.body.role };

  var x = compte.findByIdAndUpdate(req.params.id, newValues, { returnNewDocument: true }).then(function (res, err) {
    if (err) throw err;
    return res;
  });

  return x;
};
/* pour sauvegarde la modification d'un planificateur */
module.exports.sauvModifProfilPl = function (req, res) {
  var rounds = 10;
  var key = bcrypt.genSaltSync(rounds);
  var mdp_hash = bcrypt.hashSync(req.body.motDePasse, key);

  var newValues = { nom: req.body.nom, prenom: req.body.prenom, email: req.body.email, telephone: req.body.telephone, sexe: req.body.sexe, dateDeNaissance: req.body.dateDeNaissance, motDePasse: mdp_hash, cle: key, fonction: req.body.role };

  var x = compte.findByIdAndUpdate(req.params.id, newValues, { returnNewDocument: true }).then(function (res, err) {
    if (err) throw err;
    return res;
  });

  return x;
};
/* pour sauvegarde la modification d'un agent*/
module.exports.sauvModifProfilAg = function (req, res) {
  var rounds = 10;
  var key = bcrypt.genSaltSync(rounds);
  var mdp_hash = bcrypt.hashSync(req.body.motDePasse, key);

  var newValues = { nom: req.body.nom, prenom: req.body.prenom, email: req.body.email, telephone: req.body.telephone, sexe: req.body.sexe, dateDeNaissance: req.body.dateDeNaissance, motDePasse: mdp_hash, cle: key, fonction: req.body.role, matricule: req.body.matricule };

  var x = compteAg.findByIdAndUpdate(req.params.id, newValues, { returnNewDocument: true }).then(function (res, err) {
    if (err) throw err;
    return res;
  });

  return x;
};
//# sourceMappingURL=profile.ctrl.js.map
