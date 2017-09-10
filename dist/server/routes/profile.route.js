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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compte = require('../models/compte.model');


var router = _express2.default.Router();
/* profile  administrateur ou planificateur */

router.route('/profile/:id').get(function (req, res) {

    _profile2.default.profile(req, res).then(function (person) {

        res.render('profile', { person: person });
    });
});

/* profile agent */
router.route('/profileAg/:id').get(function (req, res) {

    _profile2.default.profileAg(req, res).then(function (personAg) {

        res.render('profileAg', { personAg: personAg });
    });
});
/* cas d'echec */
router.route('/echec').get(function (req, res) {
    res.render('echec');
});

/* mon profil */
router.route('/monProfile').get(function (req, res) {
    res.render('monProfile');
});

/* supprimer un compte administrateur ou planificateur */
router.route('/supprimerProfil/:id').delete(function (req, res) {

    _profile2.default.supprimerProfil(req, res).then(function (err) {

        res.status('200').send();
    });
});
/* supprimer un compte agent */
router.route('/supprimerProfilAg/:id').delete(function (req, res) {

    _profile2.default.supprimerProfilAg(req, res).then(function (err) {

        res.status('200').send();
    });
});

/* modifier profil administrateur */

router.route('/modifProfilAd/:id').get(function (req, res) {

    _profile2.default.mProfilAd(req, res).then(function (mPersonAd) {

        res.render('modifRegisterAd', { mPersonAd: mPersonAd });
    });
});

/* modifier profil planificateur */
router.route('/modifProfilPl/:id').get(function (req, res) {

    _profile2.default.mProfilPl(req, res).then(function (mPersonPl) {

        res.render('modifRegisterPl', { mPersonPl: mPersonPl });
    });
});
/* modifier profil agent */
router.route('/modifProfilAg/:id').get(function (req, res) {

    _profile2.default.mProfilAg(req, res).then(function (mPersonAg) {

        res.render('modifRegisterAg', { mPersonAg: mPersonAg });
    });
});
/* sauvegarder la modification du compte administrateur*/

router.route('/sauvModifProfilAd/:id').put(function (req, res) {

    _profile2.default.sauvModifProfilAd(req, res).then(function (err) {

        res.status('200').send();
    });
});
/* sauvegarder la modification du compte planificateur*/

router.route('/sauvModifProfilPl/:id').put(function (req, res) {

    _profile2.default.sauvModifProfilPl(req, res).then(function (err) {

        res.status('200').send();
    });
});

/* sauvegarder la modification du compte agent*/

router.route('/sauvModifProfilAg/:id').put(function (req, res) {

    _profile2.default.sauvModifProfilAg(req, res).then(function (err) {

        res.status('200').send();
    });
});

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=profile.route.js.map
