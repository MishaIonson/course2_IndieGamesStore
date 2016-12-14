var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var Game = require('../models/game');
var User = require('../models/user');

router.get('/*', csrf({ cookie: true }), function(req, res, next) {

  var pathString = req.path.substr(1);
  pathString = decodeURI(pathString);
  Game.containsGame(pathString, function(contains){
    if (contains){
      Game.getGame(pathString, function(err, gameIn){

        if (err){throw err;}
        else {

          var showDeleteButton = false;
          if ((res.locals.user != null) && (res.locals.user.user_type == 2) && (gameIn.developer_name == res.locals.user.name)){
            showDeleteButton = true;
          }

          var game = {
            price: gameIn.price,
            name: gameIn.name,
            rating: gameIn.rating,
            description: gameIn.description
          }
          var allowReview = true;
          if ((res.locals.user != null) && (res.locals.user.user_type == 1)){
            for (var i = 0; i < res.locals.user.games_reviewed.length; i++){
              if (res.locals.user.games_reviewed[i] == game.name){
                allowReview = false;
                break;
              }
            }
          }else{
            allowReview = false;
          }

          res.render('games', {game, csrfToken: req.csrfToken(), showDeleteButton, allowReview});
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

router.post('/*', csrf({ cookie: true }), ensureAuthenticated, function(req, res) {

  var pathString = req.path.substr(1);
  pathString = decodeURI(pathString);

  if (res.locals.user.user_type == 2){

    Game.getGame(pathString, function(err, game){
      if (game.developer_name == res.locals.user.name){
        Game.deleteGame(pathString, function(err){
          if (err){throw err;}

          res.redirect('/');
        });
      }else{
        res.redirect('/top');
      }

    });
    return;
  }

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
