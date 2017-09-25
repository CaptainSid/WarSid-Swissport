import Joi from 'joi';




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

  /* compte agent */
  module.exports.registerAg=Joi.object().keys({
    matricule: Joi.number().required(),
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    email:Joi.string().required().email(),
    motDePasse: Joi.string().required(),
    sexe:Joi.string().valid(['Masculin','Feminin']).required(),
    role: Joi.string().valid(['Agent']).required(),
    dateDeNaissance:Joi.date(),
    telephone:Joi.string().required(),

  });


  module.exports.login=Joi.object().keys({
    email:Joi.string().required().email(),
    motDePasse: Joi.string().required()
  });

  module.exports.savePlanning=Joi.object().keys({
    mois:Joi.number().integer().min(1).max(12).required(),
    annee:Joi.number().integer().min(2017).max(9999).required()
  });

