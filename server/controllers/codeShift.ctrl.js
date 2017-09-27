const codeShift = require('../models/codeShift.model');
var fs = require('fs');
import multer from 'multer';
import path from 'path';


module.exports.saveCodeShift = function (req, res) {
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

    var upload = multer({ storage: Storage }).single("codeShift");
    upload(req, res, function (err) {
        if (err) {
            res.json(err);
        } else {
            var cheminCSV = '';
            cheminCSV = (req.file.destination + '/' + req.file.filename);
            const regexp = new RegExp(/.csv$/i);
            //vérifier si le ficher a été importer correctement
            if (err || !regexp.test(req.file.filename)) {
                //supprimer le fichier créer
                res.send('erreur dans l importation du fichier');
                fs.unlinkSync(cheminCSV);
            } else {
                var buffer = traitementFichier(cheminCSV, res);
               var x= module.exports.getAllCodes(req, res).then(function (oldResult) {
                    if (oldResult ===null || oldResult ===undefined || (oldResult.length===0) ){
                        var tableau = new codeShift({
                            allCodes: buffer
                        });
                        tableau.save(function (err, theCodes) {
                            if (err) {
                                return res.status(400).send(err.message);
                            } else {
                                res.render('afficherShift', { codes: buffer });
                            }
                        });
                    } else {
                        var newValues={allCodes:buffer};
                       var x= codeShift.findOneAndUpdate(oldResult[0]._id,newValues, { returnNewDocument: true }).then(function (res, err) {
                            if (err) throw err;
                            return res;
                          });
                          res.render('afficherShift', { codes: buffer });
                    
                    }
                });



                // for (var i=0;i<buffer.length;i++){
                //     tableau[i]=new codeShift({
                //         code:buffer[i].code,
                //         heureDebut:buffer[i].heureDebut,
                //         heureFin:buffer[i].heureFin
                //     });
                //     tableau[i].save();
                // }

            }
        }
    });
}

function traitementFichier(cheminCSV, res) {
    var csv = fs.readFileSync(cheminCSV, { encoding: 'utf-8' },
        function (err) { console.log("reading file error " + err.message); });// !!!!!!!!!!!!!!!!!
    // diviser le fichier en ligne
    csv = csv.split("\n");
    // Récupérer le Header du fichier
    var headers = [];
    headers = csv.shift().split(";");
    var tableau = [];
    csv.forEach(function (ligne) {
        var tmp = {};
        var row = ligne.split(";");
        if (row[0] != '') // ligne non vide
        {
            tmp.code = row[0];
            tmp.heureDebut = row[1];
            var indice=tmp.heureDebut.length/2;
            tmp.heureDebut=tmp.heureDebut.insertChar(indice,'h');
            tmp.heureFin = row[2];
            var indice2=tmp.heureFin.length/2;
            tmp.heureFin=tmp.heureFin.insertChar(indice2,'h');
            // ajouter l'objet
            tableau.push(tmp);
        }
    })
    fs.unlinkSync(cheminCSV);
    return tableau;
};
String.prototype.insertChar = function (index, string) {
    if (index > 0)
      return this.substring(0, index) + string + this.substring(index, this.length);
    else
      return string + this;
  };
module.exports.getAllCodes = function (req, res) {
    var tableau = codeShift.find().then(
        function (result, err) {
            if (err) throw err;
            if (result) {
                return result;
            }
            else {
                res.redirect('/api/echec')
            }

        });
    return tableau;
};