var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var routes = require('./routes/routes');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');
var log = require('log-util');
var env = require('dotenv').config();
var user = require('./routes/api/api-users');
var session = require('express-session');

var app = express();


//db connection
var connectString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00-1capq.mongodb.net:27017,cluster0-shard-00-01-1capq.mongodb.net:27017,cluster0-shard-00-02-1capq.mongodb.net:27017/sitemockup?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;

mongoose.connect(connectString)
        .then(() => { log.info('Connected'); })
        .catch((err) => { log.error(`Unable to connect. Failed to start application: ${err}`); });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:"secretSauce",
  resave:"true",
  saveUninitialized:"true"
}));
app.use(express.static(path.join(__dirname, 'public')));

//adding the routes
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', usersRouter);
app.use('/user/', user);

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
