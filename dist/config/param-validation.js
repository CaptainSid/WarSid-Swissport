'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*export default {
  // POST /api/users
  register: {
    body: {
      nom: Joi.string().required(),
      prenom: Joi.string().required(),
      email:Joi.string().required().email(),
      //email: emailCheck.,
      motDePasse: Joi.string().required(),
      sexe: Joi.string().required(),
      //check sexe
      fonction: Joi.string().required()
    }
  },*/

module.exports.register = _joi2.default.object().keys({
  nom: _joi2.default.string().required(),
  prenom: _joi2.default.string().required(),
  email: _joi2.default.string().required().email(),
  motDePasse: _joi2.default.string().required(),
  sexe: _joi2.default.string().valid(['Masculin', 'Feminin']).required(),
  role: _joi2.default.string().valid(['Administrateur', 'Planificateur']).required(),
  dateDeNaissance: _joi2.default.date(),
  telephone: _joi2.default.string().required()

});

module.exports.login = _joi2.default.object().keys({
  email: _joi2.default.string().required().email(),
  motDePasse: _joi2.default.string().required()
});

// UPDATE /api/users/:userId
/*updateUser: {
  body: {
    username: Joi.string().required(),
    mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
  },
  params: {
    userId: Joi.string().hex().required()
  }
},
*/
// POST /api/auth/login
/*login: {
  body: {
    email: Joi.string().required(),
    motDePasse: Joi.string().required()
  }
}
};*/
//# sourceMappingURL=param-validation.js.map
