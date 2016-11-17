var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', ensureAuthenticated, function(req, res) {

  var account = {
    name: res.locals.user.name,
    email: res.locals.user.email,
    avatarPath: res.locals.user.name + ".png"
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

router.post('/', function(req, res, next){


  User.comparePassword(res.locals.user.password, req.body.password, function(err, equals){
    if (equals){

      User.getUserByEmail(res.locals.user.email, function(err, user){
        if (err)
          throw err;

        user.name = req.body.name;
        user.email = req.body.email;
        user.save(function(err){
          if (err){throw err;}

          if (req.files)
          {
            var picture = req.files.picture;

            picture.mv('./public/images/users/' + req.body.name + ".png", function(err){
              if (err)
                res.status(500).send(err);

              res.redirect('account_page');
            });
          }
          else {
            res.redirect('account_page');
          }
        });

      });
    }
    else {
      res.redirect('account_page');
    }
  });
});


module.exports = router;
