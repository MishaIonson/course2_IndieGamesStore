var express = require('express');
var router = express.Router();

Game = require('../models/game');

router.get('/*', function(req, res, next) {

  var pathString = req.path.substr(1);
  pathString = decodeURI(pathString);

  Game.getGame(pathString, function(err, games){

    if (err){res.render('error');}
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
});

module.exports = router;
