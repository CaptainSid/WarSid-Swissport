var mongoose=require('mongoose');
var bcrypt=require('bcrypt');



/* compte Schema */ 

const CompteSchema = new mongoose.Schema({
  matricule: {
      type: Number,
      required: true,
      unique:true
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique:true,
    trim:true,
    required: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  cle:{
    type:String,
    required: true
  },
  sexe: {
    type: String,
    required: true
  },
  fonction: {
    type: String,
    required: true
  },

  telephone: {
    type: String,
    required:true
  },
  dateDeNaissance: {
    type: String,
  },
  urgentNotifications :[{
    type: mongoose.Schema.Types.Mixed
  }],
  allNotifications :[{
    type: mongoose.Schema.Types.Mixed
  }]
});




module.exports= mongoose.model('CompteAgent', CompteSchema);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
/*CompteSchema.method({
});

/**
 * Statics
 */
/*UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  /*get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  } */
