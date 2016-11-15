var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  var account = {
    name: "Misha",
    email: "someEmail@gmail.com",
    avatarPath: "empty.jpg"
  };

  res.render('account_page', {account});
});

router.post('/', function(req, res, next){

  //
  var inputFile = req.files.picture;
  // console.log(inputFile);
  //

  var account = {
    name: "Misha",
    email: "someEmail@gmail.com",
    avatarPath: "empty.jpg"
  };

  if (req.body.password === "1")
  {
    account.name = req.body.name;
    account.email = req.body.email;
  }

  res.render('account_page', {account});
});


module.exports = router;
