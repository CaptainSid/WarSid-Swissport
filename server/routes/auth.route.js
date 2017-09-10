import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/authentification.ctrl';
import config from '../../config/config';
const compte=require('../models/compte.model');
import profCtrl from '../controllers/profile.ctrl';







const router = express.Router(); // eslint-disable-line new-cap


// explain everything in comments
var message='';

/* login */
router.route('/login').get(function (req, res) {
  res.render('login',{message:message});
}).post(authCtrl.login);
/* echech login */
router.route('/echecLogin').get(function(req,res){
message='Utilisateur non valide ou mot de passe incorrect';
res.json({message:'Utilisateur non valide ou mot de passe incorrect'});
});

/* ajouter compte  */

/*router.route('/register').get(function (req, res) {
  res.render('register');
}).post(authCtrl.register);*/

/*ajouter compte administrateur */ 
router.route('/registerAd').get(function (req, res) {
  res.render('registerAd');
}).post(authCtrl.register);
/*ajouter compte planificateur */
router.route('/registerPl').get(function (req, res) {
  res.render('registerPl');
}).post(authCtrl.register);
/*ajouter compte agent temporaire après elle sera modifiée */
router.route('/registerAg').get(function (req, res) {
     res.render('registerAg');
        }).post(authCtrl.registerAg);

/* home*/
router.route('/home').get(function(req,res){
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



router.route('/token').get(authCtrl.logedIn(),function(req,res){
  res.status('200').send();
});

export default router;
