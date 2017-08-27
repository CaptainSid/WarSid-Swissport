import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/authentification.ctrl';
import config from '../../config/config';







const router = express.Router(); // eslint-disable-line new-cap


// explain everything in comments
var message='';

router.route('/login').get(function (req, res) {
  res.render('login',{message:message});
}).post(authCtrl.login);

router.route('/echecLogin').get(function(req,res){
message='Utilisateur non valide ou mot de passe incorrect';
res.json({message:'Utilisateur non valide ou mot de passe incorrect'});
});


router.route('/register').get(function (req, res) {
  res.render('register');
}).post(authCtrl.register);

router.route('/home').get(function(req,res){
res.render('home');

});

router.route('/token').get(authCtrl.logedIn(),function(req,res){
  res.status('200').send();
 });


export default router;