var express = require('express');
var router = express.Router();

var Game = require('../models/game');
var User = require('../models/user');

router.get('/:game_name', ensureAuthenticated, function(req, res) {
  User.getUserByEmail(res.locals.user.email, function(err, user){
    if (err){throw err;}

    var bought = false;
    for (var i = 0; i < user.games_names_list.length; i++){
      if (user.games_names_list[i] == req.params.game_name){
        bought = true;
      }
    }

    if (bought){
      Game.getGame(req.params.game_name, function(err, game){
        if (err){throw err;}

        res.writeHead(200, {
           'Content-Length': game.file.length
        });

        res.end(game.file);
      });

    }
    else{
      res.redirect('error');
    }
  });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}

module.exports = router;
