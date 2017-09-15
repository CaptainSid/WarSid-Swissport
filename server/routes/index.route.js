import express from 'express';
//import userRoutes from './user.route';
import authRoutes from './auth.route';
import planRoutes from './planning.route';
import mobileRoutes from './mobile.route'
import profilRoutes from './profile.route';
import accueilRoutes from './accueil.route';
import expressJWT from "express-jwt";
import config from '../../config/config';

const router = express.Router(); 

router.route('/echec').get(function(req,res){
  res.render('echec');
});


router.use(authRoutes);
router.use(planRoutes);
router.use(mobileRoutes);
router.use(profilRoutes);
router.use(accueilRoutes);

export default router;