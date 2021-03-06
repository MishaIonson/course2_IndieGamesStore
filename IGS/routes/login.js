var express = require('express');
var router = express.Router();

var User = require('../models/user');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', function(req, res, next) {
  res.render('login');
});

passport.use(new LocalStrategy({usernameField: 'email'},
  function(email, password, done) {

    User.getUserByEmail(email, function(err, user){
      if (err){res.send(404); return;}

      if (!user){
        return done(null, false, {message: 'unkown user'});
      }

      User.comparePassword(user.password, password, function(err, equals){
        if (err) {res.send(404); return;}

        if (equals){
          return done(null, user);
        }
        else{
          return done(null, false, {message: 'Wrong password'});
        }
      });

    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
});

module.exports = router;
