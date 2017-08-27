import express from 'express';
//import userRoutes from './user.route';
import authRoutes from './auth.route';
import expressJWT from "express-jwt";
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /first test  */
/*router.get('/', (req, res) =>{
  res.render('home');
 
}
);*/
// router.route('/token').get(expressJWT({
//   secret: config.jwtSecret
  
// }));


router.use(authRoutes);


export default router;