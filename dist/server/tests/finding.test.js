'use strict';

var mocha = require('mocha');
var assert = require('assert');
var mongoose = require('mongoose');
var Comptes = require('../models/compte.model');

//describe test
mongoose.connect('mongodb://warda:warsid231216@ds145223.mlab.com:45223/swissport');
describe('Finding records', function () {

    it('Finds records from the database', function (done) {
        var khra = Comptes.findOne({ nom: 'warda' }).then(function (result) {
            console.log('zmer', khra);
            khra;

            assert(result.nom === 'warda');
            done();
        });
    });
});
//# sourceMappingURL=finding.test.js.map
