import Joi from 'joi';



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


  module.exports.register=Joi.object().keys({
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    email:Joi.string().required().email(),
    motDePasse: Joi.string().required(),
    sexe:Joi.string().valid(['Masculin','Feminin']).required(),
    role: Joi.string().valid(['Administrateur','Planificateur']).required(),
    dateDeNaissance:Joi.date(),
    telephone:Joi.string().required(),

  });

  module.exports.login=Joi.object().keys({
    email:Joi.string().required().email(),
    motDePasse: Joi.string().required()
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
