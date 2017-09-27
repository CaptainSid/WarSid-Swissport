import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import mobileCtrl from '../controllers/mobile.ctrl';
import codeCtrl from '../controllers/codeShift.ctrl';
import config from '../../config/config';

const router = express.Router();

router.route('/mobileLogin').post(mobileCtrl.login);
router.route('/mobileCheckUser').post(mobileCtrl.checkUser);
router.route('/mobileChangerMDP').put(mobileCtrl.changeMdp);
router.route('/mobileGetPlanning').post(mobileCtrl.getPlanning);
router.route('/mobileGetCodes').get(mobileCtrl.getAllCodes);
export default router;