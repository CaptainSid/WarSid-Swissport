var fs = require('fs');
var csv = require('csvtojson');
const plan = require('../models/planning.model');
const compte = require('../models/compteAg.model');
const socketManager = require('./socket.ctrl');
import multer from 'multer';
import path from 'path';
import paramValidation from '../../config/param-validation';
import Joi from 'joi';

module.exports.savePlanning = function (req, res) {

    //Créer le schéma du fichier qu'on va importer
    var Storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "./public");
        },
        filename: function (req, file, callback) {
            var extension = path.extname(file.originalname).toLocaleLowerCase();
            callback(null, file.fieldname + extension);
        }
    });

    var upload = multer({ storage: Storage }).single("planning");
    upload(req, res, function (err) {//unhandled error !!!!!!!!!!!!!!!!!!!!!!!!!
        var month = req.body.mois;
        var year = req.body.annee;

        //valider les données introduise dans le formulaire avant de commencer l'importation
        Joi.validate({ mois: month, annee: year }, paramValidation.savePlanning, function (err, value) {
            if (err === null) {
                var cheminCSV = '';
                cheminCSV = (req.file.destination + '/' + req.file.filename);
                //Vérifier s'il n'existe pas un planning qui correspond à la date introduite
                planningExist(month, year).then(function (exist) {
                    if (!exist) {
                        const regexp = new RegExp(/.csv$/i);
                        //vérifier si le ficher a été importer correctement
                        if (err || !regexp.test(req.file.filename)) {
                            //supprimer le fichier créer
                            res.send('erreur dans l importation du fichier');
                            fs.unlinkSync(cheminCSV);
                        }
                        else {
                            //Récupérer les données du fichier csv et les retourner sous format json
                            var buffer = traitementFichier(cheminCSV, res);
                            //sauvegarder le planning dans la BDD        
                            var planningGlobal = new plan({
                                mois: month,
                                annee: year,
                                originalHeaders:buffer.originalHeaders,
                                headers: buffer.headers,
                                planning: buffer.planning
                            });
                            planningGlobal.save(function (err, plan) {
                                if (err) {
                                    return res.status(400).send(err.message);
                                } else {
                                    res.render('planning', { plan: planningGlobal });
                                    var listeAgent = [];
                                    for (var i = 0; i < buffer.planning.length; i++) {
                                        listeAgent.push(buffer.planning[i].matricule);
                                    }
                                    const maxNotifId = 99999999;
                                    var notificationText = "Votre planning du mois " + month + "/" + year + " est maintenant disponible";
                                    var randomInt = require('random-int');
                                    var notificationId = randomInt(maxNotifId);
                                    var notification = { id: notificationId, text: notificationText };
                                    notifierPersonnel(listeAgent, notification);
                                }
                            });

                        }

                    } else {
                        res.send('attention! il existe un planning de cette date dans la BDD');
                        fs.unlinkSync(cheminCSV);
                    }
                });
            } else {
                res.status('400').send(err.message);
            }
        })


    });

};

// vérifier que la chaine commence par 3 lettre. chiffre ex:jeu. 1
function estJour(str) {
    const regexp = new RegExp(/[a-z]{3}. [0-9]{1,2}/i);
    return regexp.test(str);
};
//vérifier si une colonne doit etre sauvegarder dans la BDD
function estImportant(str) {
    const regexp = new RegExp(/matricule|^nom$|^jour[0-9]{1,2}$/i);
    return regexp.test(str);
};

function traitementFichier(cheminCSV, res) {
    // lire le fichier CSV
    var csv = fs.readFileSync(cheminCSV, { encoding: 'utf-8' },
        function (err) { console.log("reading file error " + err.message); });// !!!!!!!!!!!!!!!!!
    // diviser le fichier en ligne
    csv = csv.split("\n");

    // Récupérer le Header du fichier
    var originalHeaders=[];
    var headers = [];
    originalHeaders = csv.shift().split(",");
    headers=originalHeaders.slice(0);
    // Remplacer les valeurs  des headers afin qu'on puisse les manipuler facilement 
    var na = headers.indexOf('Name');
    headers[0] = "matricule";
    headers[na] = headers[na].replace(/Name/gi, 'nom');

    // rechercher le premier élément du header qui correspont à un jour
    var deb = headers.findIndex(estJour);
    for (var i = deb; i < headers.length; i++) {
        headers[i] = headers[i].replace(/ [a-z]{3}/gi, '');
        headers[i] = headers[i].replace(/. /g, 'jour');
        headers[i] = headers[i].replace(/1\r/g, '31');
    }
    //supprimer tous les champs qu'on veut pas sauvegarder dans la BDD
    var forbiden = [];
    var cpt = 0;
    for (var i = 0; i < headers.length; i++) {
        if (!estImportant(headers[i])) {
            headers.splice(i, 1);
            originalHeaders.splice(i,1);
            forbiden.push(i + cpt);
            cpt++;
            i--;
        }
    }

    var planning = [];

    //parcourir le fichier
    csv.forEach(function (ligne) {
        var tmp = {};
        var row = ligne.split(",");
        var cpt2 = 0;
        if (row[0] != '') // ligne non vide
        {
            for (var i = 0; i < headers.length; i++) {
                while (forbiden.indexOf(i + cpt2) > -1)// vérificer si la ligne ne fait pas partie des lignes supplémentaires dont on a pas besoin
                {
                    cpt2++;
                }
                tmp[headers[i]] = row[i + cpt2];
                tmp[headers[i]] = tmp[headers[i]].replace(/\r/g, '');
            }
            // ajouter l'objet
            planning.push(tmp);
        }
    });
    fs.unlinkSync(cheminCSV);
    return ({ originalHeaders,headers, planning });
};

//vérifier pour une date donnée si un planning existe dans la BDD
function planningExist(month, year) {

    var bol = plan.findOne({ annee: year, mois: month }).then(function (result, err) {
        if (result) {
            return true;
        } else {
            return false;
        }
    });
    return bol;


};

module.exports.getPlanning = function (req, res) {
    var planning = plan.findOne({ annee: req.params.annee, mois: req.params.mois }).then(
        function (result, err) {
            if (err) throw err;
            if (result) {
                return result;
            }
            else {
                res.redirect('/api/echec')
            }

        });
    return planning;
};

module.exports.getAllPlanning = function (req, res) {
    var planning = [];
    planning = plan.find().then(
        function (result, err) {
            if (err) throw err;
            if (result) {
                return result;
            }
            else {
                res.redirect('/api/echec')
            }

        });
    return planning;
};

module.exports.MAJplanning = function (req, res) {
    module.exports.getPlanning(req, res).then(function (planningGlobal) {
        var planningOriginal = [];
        planningOriginal = planningGlobal.planning;
        var Storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, "./public");
            },
            filename: function (req, file, callback) {
                var extension = path.extname(file.originalname).toLocaleLowerCase();
                callback(null, file.fieldname + extension);
            }
        });

        var upload = multer({ storage: Storage }).single("planning");
        upload(req, res, function (err) {
            var cheminCSV = '';
            cheminCSV = (req.file.destination + '/' + req.file.filename);
            var buffer = traitementFichier(cheminCSV, res);
            var nvPlanning = buffer.planning;
            var headers = buffer.headers;
            var agentsConcernee = [];
            //récupérer la liste des agents dont le planning a été modifier
            for (var i = 0; i < planningOriginal.length; i++) {
                var agent = planningOriginal[i];
                var nvAgent = nvPlanning.find(x => x.matricule === agent.matricule);
                for (var j = 0; j < headers.length; j++) {
                    if (agent[headers[j]] != nvAgent[headers[j]]) {
                        agentsConcernee.push(agent.matricule);
                        j = headers.length; // pour sortir de la boucle immédiatement
                    }
                }
            }
            //test
            console.log("liste des agents concernés");
            for (var i = 0; i < agentsConcernee.length; i++) {
                console.log(agentsConcernee[i]);
            }
            //sauvegarder le planning dans la BDD   
            var newValues = { headers: buffer.headers, planning: buffer.planning };
            var x = plan.findOneAndUpdate({ _id: planningGlobal._id }, newValues, { returnNewDocument: true }).then(function (res, err) {
                if (err) throw err;
                return res;
            });
            //envoyer les notifs au agent concernés
            const maxNotifId = 9999999;
            var notificationText = "Votre planning du mois " + planningGlobal.mois + "/" + planningGlobal.annee + " a été modifié";
            var randomInt = require('random-int');
            var notificationId = randomInt(maxNotifId);
            var notification = { id: notificationId, text: notificationText };
            notifierPersonnel(agentsConcernee, notification);
        });



    });
};

function notifierPersonnel(listeAgent, notification) {
    for (var i = 0; i < listeAgent.length; i++) {
        var tmp = compte.findOneAndUpdate({ matricule: listeAgent[i] }, { $push: { "urgentNotifications": notification, "allNotifications": notification } }, { returnNewDocument: true }).then(function (result, err) {
            if (err) throw err;
            if (result) {
                var mySocket = socketManager.getSocket(result.matricule);
                if (mySocket) {
                    socketManager.sendNotification(mySocket, notification);
                }
            }
            return result;
        });
    }
};

module.exports.supprimerPlanning = function (req, res) {
    var planning = plan.findOneAndRemove({ annee: req.params.annee, mois: req.params.mois }).then(function (err) {
        if (err) {

            res.send(err.message);

        }

    });
    return planning;

};