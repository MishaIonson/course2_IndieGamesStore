var express = require('express');
var router = express.Router();

var Game = require('../models/game');
var User = require('../models/user');

router.get('/*', function(req, res, next) {

  var pathString = req.path.substr(1);
  pathString = decodeURI(pathString);
  Game.containsGame(pathString, function(contains){
    if (contains){
      Game.getGame(pathString, function(err, games){

        if (err){throw err;}
        else {

          var game = {
            price: games[0].price,
            name: games[0].name,
            rating: games[0].rating,
            description: games[0].description,
            imagePath: games[0].name + ".png"
          }

          res.render('games', {game});
        }
      });
    }
    else {
      res.render('/error');
    }
  });

});

router.post('/*', function(req, res, next) {

  var pathString = req.path.substr(1);
  pathString = decodeURI(pathString);

  User.getUserByEmail(res.locals.user.email, function(err, user){
    if (err){throw err;}

    Game.containsGame(pathString, function(contains){
      if (contains){
        user.games_names_list.push(pathString);
        user.save(function(err){
          if (err){throw err;}

          res.redirect(pathString);
        });
      }
    });
  });
});


module.exports = router;
