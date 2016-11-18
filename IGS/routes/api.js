// REST API for client

var express = require('express');
var router = express.Router();
User = require('../models/user');
Game = require('../models/game');
Article = require('../models/article');

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
        description: users[i].description,
        user_type: users[i].user_type
      });
    }
    res.json(usersOutput);
  });

});

router.get('/users/:email', function(req, res, next){

  User.containsUser(req.params.email, function(contains){
    if (contains){
      User.getUserByEmail(req.params.email, function(err, user){
        if (err){throw err;}

        var userOutput = {
          name: user.name,
          email: user.email,
          games_names_list: user.games_names_list,
          description: user.description,
          user_type: user.user_type
        }

        res.json(userOutput);
      });
    }else{
      res.send(404);
    }
  });

});

router.post('/users', function(req, res, next){

  var newAccount = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    games_names_list: [],
    user_type: 1,
    description: ""
  });

  User.containsUser(newAccount.email, function(doesContain){
    if (!doesContain){
      User.addUser(newAccount, function(err, user){
          if(err)
            throw err;

          res.send(200);
        });
    }else{
      res.redirect(400);
    }
  });
});

router.put('/users/:email', function(req, res, next) {

  User.containsUser(req.params.email, function(contains){
    if (contains){

      User.getUserByEmail(req.params.email, function(err, user){
        User.comparePassword(user.password, req.body.password, function(err, areSame){
          if (areSame){
            user.name = req.body.name;
            user.games_names_list = req.body.games_names_list;
            user.description = req.body.description;
            user.save(function(err){
              if (err){throw err;}

              res.send(200);
            })
          }else{
            res.send(403);
          }
        });
      });

    }else{
      res.send(404);
    }
  });

});


// I'm not writing the GET games and articles by name, because all required info consists in /games and /articles corresponding

router.get('/games', function(req, res, next) {

  Game.getGames(function(err,games){
    if(err)
      throw err;

    res.json(games);
  });

});

router.get('/articles', function(req, res, next) {

  Article.getArticles(function(err, articles){
    if(err)
      throw err;

    res.json(articles);
  });

});
module.exports = router;
