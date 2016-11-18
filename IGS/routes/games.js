var express = require('express');
var router = express.Router();

var Game = require('../models/game');
var User = require('../models/user');

router.get('/*', function(req, res, next) {

  var pathString = req.path.substr(1);
  pathString = decodeURI(pathString);
  Game.containsGame(pathString, function(contains){
    if (contains){
      Game.getGame(pathString, function(err, gameIn){

        if (err){throw err;}
        else {

          var game = {
            price: gameIn.price,
            name: gameIn.name,
            rating: gameIn.rating,
            description: gameIn.description,
            imagePath: gameIn.name + ".png"
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

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}

router.post('/*', ensureAuthenticated, function(req, res) {

  var pathString = req.path.substr(1);
  pathString = decodeURI(pathString);

  if (req.body.review_score == null)
  {
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
  }
  else{
    Game.containsGame(pathString, function(containsTheGame){
      if (containsTheGame){
        User.getUserByEmail(res.locals.user.email, function(err, userIn){
          if (err){throw err;}
          User.haveReviewedGame(userIn, pathString, function(have){
            if (!have){
              Game.getGame(pathString, function(err, game){
                if (err){throw err;}

                game.rating = (parseInt(req.body.review_score) + game.rating * game.votes_number) / (game.votes_number + 1);
                game.rating = game.rating.toFixed(1);


                game.votes_number++;
                game.save(function(err){
                  if (err){throw err;}



                    userIn.games_reviewed.push(pathString);
                    userIn.save(function(err){
                      res.redirect(pathString);
                    });
                  });

                });
          }else{
            res.redirect(pathString);
          }
        });
      });
      }else{
        console.log("does not contain");
        res.redirect('error');
      }
    });
  }

});


module.exports = router;
