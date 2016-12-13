var express = require('express');
var redirect = require("express-redirect");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/igs_db');

var app = express();
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});

redirect(app);

// passport & session stuff
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require("express-validator");
var flash = require("connect-flash");

app.use(session({
  secret: 'awesomesecret',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());
app.use(function (req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
//

// ROUTES
var routes = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var sign_up = require('./routes/sign_up');
var search = require('./routes/search');
var top = require('./routes/top');
var gamesPage = require('./routes/games');
var articlesPage = require('./routes/articles');
var account_page = require('./routes/account_page');
var new_article = require('./routes/new_article');
var api = require('./routes/api');
var image = require('./routes/image');
// var images = require('./routes/images');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', routes);
app.use('/index', routes);
app.use('/login', login);
app.use('/logout', logout);
app.use('/sign_up', sign_up);
app.use('/search', search);
app.use('/top', top);
app.use('/games', gamesPage);
app.use('/articles', articlesPage);
app.use('/account_page', account_page);
app.use('/new_article', new_article);
app.use('/api', api);
app.use('/image', image);
// app.use('/images', images);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
