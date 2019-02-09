const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const config = require('./config/config');
const GameSchedule = require('./models/GameSchedule');
const TeamInfo = require('./models/TeamInfo');
const PlayerInfo = require('./models/PlayerInfo');
const Event = require('./models/Event');

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://"+config.mongo_user+":"+config.mongo_password+"@cluster0-vyric.mongodb.net/"+config.mongo_database+"?retryWrites=true").then(() => {
    console.log("Connected with mongo");
    
    }).catch(err => {
    console.log("Error while connecting db "+err);
    });

const indexRouter = require('./routes/index');
const dialogflowRouter = require('./routes/dialogflow');
const downloadRouter = require('./routes/documenthandler');

const app = express();

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
app.use('/documenthandler', downloadRouter);

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
