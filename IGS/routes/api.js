var express = require('express');
var router = express.Router();
User = require('../models/user');

router.get('/users', function(req, res, next) {

  User.getUsers(function(err,users){
    if(err)
      throw err;
    var usersOutput = [];
    for (var i = 0; i < users.length; i++)
    {
      // I'm using new arrays because have some problems with field deleting from core array
      usersOutput.push({
        name: users[i].name,
        email: users[i].email,
        games_names_list: users[i].games_names_list,
        description: users[i].description
      });
    }
    res.json(usersOutput);
  });

});
module.exports = router;
