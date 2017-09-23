import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import helmet from 'helmet';
import winstonInstance from './winston';
import routes from '../server/routes/index.route';
import config from './config';
import APIError from '../server/helpers/APIError';
import ejs from 'ejs';
import path from 'path';
import jwt from 'jsonwebtoken';
import fileUpload from 'express-fileupload';
import socketio from 'socket.io';

const app = express();
const server = require('http').Server(app);
/*if (config.env === 'development') {
  app.use(logger('dev'));
}*/

//set socket.io
const io=socketio(server);
const mySocket=require('../server/controllers/socket.ctrl').init(io);
// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../server/views'));



// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());



// mount all routes on /api path
app.use('/api', routes);

// add static files
var chemin=path.join(__dirname, '../public');

app.use('/api/public',express.static(chemin));
//console.log(chemin);

//upload files
app.use(fileUpload());

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
);

server.listen(3000);


export default app;
