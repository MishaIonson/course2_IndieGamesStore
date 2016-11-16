var express = require('express');
var router = express.Router();

Game = require('../models/game');

router.get('/', function(req, res, next) {

  var feed_posts = [];

  Game.getGames(function(err, games){
    if (err)
    {
      res.render('error');
    }
    else {
      for (var i = 0; i < games.length; i++)
      {
        feed_posts.push({
          href: "games/" + games[i].name,
          imagePath: "games/" + games[i].name + ".png",
          title: games[i].name,
          description: games[i].description
        });
      }
      res.render('search', {feed_posts: feed_posts});
    }
  });
});

module.exports = router;
