'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('./auth.route');

var _auth2 = _interopRequireDefault(_auth);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _profile = require('./profile.route');

var _profile2 = _interopRequireDefault(_profile);

var _accueil = require('./accueil.route');

var _accueil2 = _interopRequireDefault(_accueil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** GET /first test  */
/*router.get('/', (req, res) =>{
  res.render('home');
 
}
);*/
// router.route('/token').get(expressJWT({
//   secret: config.jwtSecret

// }));


//import userRoutes from './user.route';
router.use(_auth2.default);
router.use(_profile2.default);
router.use(_accueil2.default);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=index.route.js.map
