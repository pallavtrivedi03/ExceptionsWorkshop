var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var config = require('./config/config');
var GameSchedule = require('./models/GameSchedule');
var TeamInfo = require('./models/TeamInfo');
var PlayerInfo = require('./models/PlayerInfo');
var Event = require('./models/Event');

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://"+config.mongo_user+":"+config.mongo_password+"@cluster0-vyric.mongodb.net/"+config.mongo_database+"?retryWrites=true").then(() => {
    console.log("Connected with mongo");
    
    }).catch(err => {
    console.log("Error while connecting db "+err);
    });

var indexRouter = require('./routes/index');
var dialogflowRouter = require('./routes/dialogflow');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dialogflow', dialogflowRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
