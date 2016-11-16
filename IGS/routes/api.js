var express = require('express');
var router = express.Router();
User = require('../models/user');


router.get('/', function(req, res, next) {

  User.getUsers(function(err,users){
  if(err)
    throw err;
  res.json(users);
  });

});
router.post('/', function(req, res, next) {

  User.getUsers(function(err,users){
  if(err)
    throw err;
  res.json(users);
  });

});
module.exports = router;
