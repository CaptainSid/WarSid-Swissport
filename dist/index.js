'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config should be imported before importing any other file
//import config from './config/config';
var config = require('./config/config');
var app = require('./config/express');

var mongoose = require('mongoose');
var util = require('util');

var debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
mongoose.connect('mongodb://localhost/test');
var mongoUri = config.mongo.host;
mongoose.connection.on('error', function () {
  throw new Error('unable to connect to database: ' + mongoUri);
});

app.listen(3000);

module.exports.app = app;
//# sourceMappingURL=index.js.map
