var express = require('express');
var router = express.Router();

//@TODO: fix bad: because of name as path for image, in case of name changing images will be lost

var User = require('../models/user');

router.get('/', ensureAuthenticated, function(req, res) {

  var account = {
    name: res.locals.user.name,
    email: res.locals.user.email
  };

  res.render('account_page', {account});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}

router.post('/', ensureAuthenticated, function(req, res){


  User.comparePassword(res.locals.user.password, req.body.password, function(err, equals){
    if (equals){

      User.getUserByEmail(res.locals.user.email, function(err, user){
        if (err)
          throw err;

        user.image = req.files.picture.data;

        user.name = req.body.name;
        user.save(function(err){
          if (err){throw err;}
            res.redirect('account_page');
        });

      });
    }
    else {
      res.redirect('account_page');
    }
  });
});


module.exports = router;
