var express = require('express');
var router = express.Router();
var validator = require('validator');

var User = require('../models/user');

router.get('/', function(req, res, next) {
  res.render('sign_up');
});
router.post('/', function(req, res, next){

  if (!(validator.isEmail(req.body.email) && validator.isAlphanumeric(req.body.name))){
    res.redirect('sign_up');
    return;
  }

  if (req.body.confirmed_password === req.body.password)
  {
    var newAccount = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      games_names_list: [],
      user_type: 1,
      description: "",
      image: ""
    });

    User.containsUser(newAccount.email, function(doesContain){
      if (!doesContain){
        User.addUser(newAccount, function(err, user){
            if(err)
              throw err;

            res.redirect('login');
          });
      }else{
        res.redirect('sign_up');
      }
    });
  }
  else {
    res.redirect('sign_up');
  }
});

module.exports = router;
