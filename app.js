require('dotenv').config();
require('express-group-routes');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const {getFullPath} = require('./app/utils/router');
const {LOG_FORMAT} = require('./app/enums/logger');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

if (process.env.NODE_ENV !== 'development') {
  app.use(logger(JSON.stringify(LOG_FORMAT)));
} else {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
// enable cors pre-flight
app.options('*', cors());
// somehow cors failed #Testing only
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes

const traverseDir = getFullPath(__dirname + '/routes/');
traverseDir.map((fullPath) => {
  app.use('/', require(fullPath));
});

// error handler
app.use(function(err, req, res, next) {
  if (typeof err.handle === 'function') {
    err.handle();
  }

  if (err.message === undefined) {
    console.error(err);
  }

  // render the error page
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong. Please try again later.',
  });
});

module.exports = app;
