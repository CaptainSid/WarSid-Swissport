import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';

import config from '../../config/config';
const compte=require('../models/compte.model');
import profCtrl from '../controllers/profile.ctrl';

const router = express.Router();
/* profile  administrateur ou planificateur */ 

router.route('/profile/:id').get(function (req, res) {
    
    
    
    
    profCtrl.profile(req,res).then((person)=>{


        res.render('profile',{person });
    
    });
  
  
});
  
/* profile agent */
router.route('/profileAg/:id').get(function (req, res) {
    
    
    
    
    profCtrl.profileAg(req,res).then((personAg)=>{


        res.render('profileAg',{personAg });
    
    });
    
    
    
  
});

    
    /* mon profil */ 
    router.route('/monProfile').get(function(req,res){
        res.render('monProfile');
        });
    
  
  /* supprimer un compte administrateur ou planificateur */
  router.route('/supprimerProfil/:id').delete(function (req, res) {
    
    

    
    profCtrl.supprimerProfil(req,res).then((err)=>{
        
        res.status('200').send();
            
            });

  
});
/* supprimer un compte agent */
router.route('/supprimerProfilAg/:id').delete(function (req, res) {
    
    

    
    profCtrl.supprimerProfilAg(req,res).then((err)=>{
        
        res.status('200').send();
            
            });

  
});

/* modifier profil administrateur */

router.route('/modifProfilAd/:id').get(function (req, res) {
    
    
    
    
    profCtrl.mProfilAd(req,res).then((mPersonAd)=>{


        res.render('modifRegisterAd',{mPersonAd });
    
    });
    
    
    
  
});

/* modifier profil planificateur */
router.route('/modifProfilPl/:id').get(function (req, res) {
    
    
    
    
    profCtrl.mProfilPl(req,res).then((mPersonPl)=>{


        res.render('modifRegisterPl',{mPersonPl });
    
    });
    
    
    
  
});
/* modifier profil agent */
router.route('/modifProfilAg/:id').get(function (req, res) {
    
    
    
    
    profCtrl.mProfilAg(req,res).then((mPersonAg)=>{


        res.render('modifRegisterAg',{mPersonAg });
    
    });
    
    
    
  
});
/* sauvegarder la modification du compte administrateur*/

router.route('/sauvModifProfilAd/:id').put(function (req, res) {
    
    

    
    profCtrl.sauvModifProfilAd(req,res).then((err)=>{
        
        res.status('200').send();
            
            });

  
});
/* sauvegarder la modification du compte planificateur*/

router.route('/sauvModifProfilPl/:id').put(function (req, res) {
    
    

    
    profCtrl.sauvModifProfilPl(req,res).then((err)=>{
        
        res.status('200').send();
            
            });   
  
});

/* sauvegarder la modification du compte agent*/

router.route('/sauvModifProfilAg/:id').put(function (req, res) {
    
    

    
    profCtrl.sauvModifProfilAg(req,res).then((err)=>{
        
        res.status('200').send();
            
            });   
  
});





export default router;
