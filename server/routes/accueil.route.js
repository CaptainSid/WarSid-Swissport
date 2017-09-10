import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';

import config from '../../config/config';
const compte=require('../models/compte.model');
import profCtrl from '../controllers/profile.ctrl';
import accueilCtrl from '../controllers/accueil.ctrl';
import authCtrl from '../controllers/authentification.ctrl';
const router = express.Router();
/* profile pour administrateur et planificateur */ 

router.route('/accueil/:fonction').get(function (req, res) {
    
    
    
    // la personne demandé //
    accueilCtrl.accueil(req,res).then((person)=>{


        res.render('accueilAdmin',{person });
    
    });
});
    /* accueuil pour agent */ 
    router.route('/accueilAg/:fonction').get(function (req, res) {
        
        
        
        // la personne demandé //
        accueilCtrl.accueilAg(req,res).then((personAg)=>{
    
    
            res.render('listeAgent',{personAg });
        
        });
    });

    // la personne connectée 
   /* authCtrl.login(req,res.json).then((personLoged)=>{
        
        
                res.render('accueilAdmin',{personLoged });
            
            });*/

    //if (Error)
       // {
        //    res.redirect('/api/login'); 
       // }
    
    
  

  
/* cas d'echec */
router.route('/echec').get(function(req,res){
    res.render('echec');
    });
    
    
  
  


export default router;