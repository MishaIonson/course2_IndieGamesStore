var express = require('express');
var router = express.Router();
var validator = require('validator');
var replaceall = require("replaceall");

var Game = require('../models/game');

router.get('/', ensureAuthenticated, function(req, res) {
  res.render('new_game');
});

router.post('/', ensureAuthenticated, function(req, res){

  var descriptionForValidation = req.body.description;
  var nameForValidation = req.body.name;
  descriptionForValidation = replaceall(" ", "0", descriptionForValidation);
  descriptionForValidation = replaceall(".", "0", descriptionForValidation);
  descriptionForValidation = replaceall(",", "0", descriptionForValidation);
  descriptionForValidation = replaceall("!", "0", descriptionForValidation);
  descriptionForValidation = replaceall("-", "0", descriptionForValidation);
  descriptionForValidation = replaceall("\n", "0", descriptionForValidation);
  descriptionForValidation = replaceall(":", "0", descriptionForValidation);
  descriptionForValidation = replaceall(";", "0", descriptionForValidation);
  nameForValidation = replaceall(" ", "0", nameForValidation);
  nameForValidation = replaceall(".", "0", nameForValidation);
  nameForValidation = replaceall(",", "0", nameForValidation);
  nameForValidation = replaceall("!", "0", nameForValidation);
  nameForValidation = replaceall("-", "0", nameForValidation);

  console.log(descriptionForValidation);

  if (!(validator.isInt(req.body.price) && validator.isAlphanumeric(nameForValidation) && validator.isAlphanumeric(descriptionForValidation))){
    res.redirect('new_game');
    return;
  }

  var newGame = new Game({
    name: req.body.name,
    rating: 5.0,
    votes_number: 1,
    price: req.body.price,
    developer_name:res.locals.user.name,
    description: req.body.description,
    image: req.files.image.data,
    file: req.files.file.data
  });

  Game.addGame(newGame, function(err){
    res.redirect('/index');
  });

});


function ensureAuthenticated(req, res, next){
	if((req.isAuthenticated()) && (res.locals.user.user_type == 2)){
		return next();
	} else {
		res.redirect('/index');
	}
}

module.exports = router;
