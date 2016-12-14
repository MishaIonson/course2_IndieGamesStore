var express = require('express');
var router = express.Router();
var validator = require('validator');
var csrf = require('csurf');
var replaceall = require("replaceall");

var Artice = require('../models/article');

router.get('/', csrf({ cookie: true }), ensureAuthenticated, function(req, res) {
  res.render('new_article', { csrfToken: req.csrfToken() });
});

router.post('/', csrf({ cookie: true }), ensureAuthenticated, function(req, res){

  var descriptionForValidation = req.body.description;
  var titleForValidation = req.body.title;
  descriptionForValidation = replaceall(" ", "0", descriptionForValidation);
  descriptionForValidation = replaceall(".", "0", descriptionForValidation);
  descriptionForValidation = replaceall(",", "0", descriptionForValidation);
  descriptionForValidation = replaceall("!", "0", descriptionForValidation);
  descriptionForValidation = replaceall("-", "0", descriptionForValidation);
  descriptionForValidation = replaceall("\n", "0", descriptionForValidation);
  descriptionForValidation = replaceall(":", "0", descriptionForValidation);
  descriptionForValidation = replaceall(";", "0", descriptionForValidation);
  titleForValidation = replaceall(" ", "0", titleForValidation);
  titleForValidation = replaceall(".", "0", titleForValidation);
  titleForValidation = replaceall(",", "0", titleForValidation);
  titleForValidation = replaceall("!", "0", titleForValidation);
  titleForValidation = replaceall("-", "0", titleForValidation);

  if (!(validator.isAlphanumeric(titleForValidation) && validator.isAlphanumeric(descriptionForValidation))){
    res.redirect('new_article');
    return;
  }

  if(req.files){
    var newArticle = new Article({
      title: req.body.title,
      description: req.body.description,
      image: req.files.picture.data
    });

    Article.addArticle(newArticle, function(err){
      if (err){throw err;}

      res.redirect('index');
    });
  }
});


function ensureAuthenticated(req, res, next){
	if((req.isAuthenticated()) && (res.locals.user.user_type == 0)){
		return next();
	} else {
		res.redirect('/index');
	}
}

module.exports = router;
