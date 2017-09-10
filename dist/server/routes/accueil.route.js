'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _profile = require('../controllers/profile.ctrl');

var _profile2 = _interopRequireDefault(_profile);

var _accueil = require('../controllers/accueil.ctrl');

var _accueil2 = _interopRequireDefault(_accueil);

var _authentification = require('../controllers/authentification.ctrl');

var _authentification2 = _interopRequireDefault(_authentification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compte = require('../models/compte.model');

var router = _express2.default.Router();
/* profile pour administrateur et planificateur */

router.route('/accueil/:fonction').get(function (req, res) {

    // la personne demandé //
    _accueil2.default.accueil(req, res).then(function (person) {

        res.render('accueilAdmin', { person: person });
    });
});
/* accueuil pour agent */
router.route('/accueilAg/:fonction').get(function (req, res) {

    // la personne demandé //
    _accueil2.default.accueilAg(req, res).then(function (personAg) {

        res.render('listeAgent', { personAg: personAg });
    });
});

// la personne connectée 
/* authCtrl.login(req,res.json).then((personLoged)=>{
     
     
             res.render('accueilAdmin',{personLoged });
         
         });*/

//if (Error)
// {
//    res.redirect('/api/login'); 
// }


/* cas d'echec */
router.route('/echec').get(function (req, res) {
    res.render('echec');
});

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=accueil.route.js.map
