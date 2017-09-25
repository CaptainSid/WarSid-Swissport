import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import planCtrl from '../controllers/plannning.ctrl';
import authCtrl from '../controllers/authentification.ctrl';
import msgCtrl from '../controllers/message.ctrl';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

// explain everything in comments

router.route('/listePlanning').get(function (req, res) {
    planCtrl.getAllPlanning(req, res).then(function (plan) {
        res.render('listePlanning', { plan });
    });
});
router.route('/ajouterShift').get(function (req, res) {
    res.render('ajouterShift');
});
router.route('/listeShift').get(function (req, res) {
    res.render('afficherShift');
});
router.route('/listeMessage').get(function (req, res) {
    msgCtrl.getAllMessages(req, res).then(function (msg) {
        res.render('tousMessages', { messages:msg });
    });
});
router.route('/supprimerMessage/:id').delete(function (req, res) {
    msgCtrl.supprimerMessage(req, res).then((err) => {
        res.status('200').send();
    });
});
router.route('/importerAg').get(function (req, res) {
    res.render('importerAgents');
});

router.route('/upload').get(function (req, res) {
    res.render('planningupload');
});

router.route('/upload').post(function (req, res) {
    planCtrl.savePlanning(req, res);
});

router.route('/planning/:annee/:mois').get(function (req, res) {
    planCtrl.getPlanning(req, res).then(function (plan) {
        res.render('planning', { plan });
    });

});

router.route('/supprimerPlanning/:annee/:mois').delete(function (req, res) {
    planCtrl.supprimerPlanning(req, res).then((err) => {
        res.status('200').send();
    });

});

router.route('/MAJplanningUpload/:annee/:mois').get(function(req,res){
var data=[];
data.annee=req.params.annee;
data.mois=req.params.mois;
res.render('MAJPlanning',{data});
});

router.route('/MAJPlanning/:annee/:mois').post(function(req,res){
    planCtrl.MAJplanning(req,res);
    planCtrl.getAllPlanning(req, res).then(function (plan) {
        res.render('listePlanning', { plan });
});
});


router.route('/token').get(authCtrl.logedIn(), function (req, res) {
    res.status('200').send();
});


export default router;