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

var _authentification = require('../controllers/authentification.ctrl');

var _authentification2 = _interopRequireDefault(_authentification);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _profile = require('../controllers/profile.ctrl');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compte = require('../models/compte.model');


var router = _express2.default.Router(); // eslint-disable-line new-cap


// explain everything in comments
var message = '';

/* login */
router.route('/login').get(function (req, res) {
  res.render('login', { message: message });
}).post(_authentification2.default.login);
/* echech login */
router.route('/echecLogin').get(function (req, res) {
  message = 'Utilisateur non valide ou mot de passe incorrect';
  res.json({ message: 'Utilisateur non valide ou mot de passe incorrect' });
});

/* ajouter compte  */

/*router.route('/register').get(function (req, res) {
  res.render('register');
}).post(authCtrl.register);*/

/*ajouter compte administrateur */
router.route('/registerAd').get(function (req, res) {
  res.render('registerAd');
}).post(_authentification2.default.register);
/*ajouter compte planificateur */
router.route('/registerPl').get(function (req, res) {
  res.render('registerPl');
}).post(_authentification2.default.register);
/*ajouter compte agent temporaire après elle sera modifiée */
router.route('/registerAg').get(function (req, res) {
  res.render('registerAg');
}).post(_authentification2.default.registerAg);

/* home*/
router.route('/home').get(function (req, res) {
  res.render('home');
});

/*router.route('/profile/:nom').get(function (req, res) {
  compte.findOne({nom:req.params.nom}).then(function(persone,err){
    if (persone){
      res.render('profile',{person : persone});

    }else{
      console.log('element not found');
    }

  });
  


}); */

router.route('/token').get(_authentification2.default.logedIn(), function (req, res) {
  res.status('200').send();
});

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=auth.route.js.map
