var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var dishes = require('./routes/dishes');
var dishes_types = require('./routes/dishes_types');

var app = express();

// view engine setup, we do not care about it
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/utils', express.static(__dirname + 'client/src/utils'));
app.use('/models', express.static(__dirname + 'client/src/models'));
app.use('/js', express.static(__dirname + '/client/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/client/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/client/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use('/dishes', dishes);
app.use('/dishestypes', dishes_types);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
