var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  //@TODO: upload from db
  var account = {
    name: "Misha",
    email: "someEmail@gmail.com",
    avatarPath: "misha" + ".png"
  };

  res.render('account_page', {account});
});

router.post('/', function(req, res, next){

  //@TODO: delete
  var account = {
    name: "Misha",
    email: "someEmail@gmail.com",
    avatarPath: "empty.jpg"
  };
  //

  if (req.body.password === "1") // @TODO
  {
    account.name = req.body.name;
    account.email = req.body.email;

    if (req.files)
    {
      var picture = req.files.picture;
      
      picture.mv('./public/images/users/' + account.name + ".png", function(err){
        if (err)
          res.status(500).send(err);
      });
    }
  }
  res.render('account_page', {account});
});


module.exports = router;
