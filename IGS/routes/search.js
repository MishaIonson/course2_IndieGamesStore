var express = require('express');
var router = express.Router();

Game = require('../models/game');

/* GET home page. */
router.get('/*', function(req, res, next) {

  // console.log("Searched: " + req.query.search_line);
  var feed_posts = [];

  if (req.query.search_line == null){
    res.redirect('../error');
    return;
  }


  Game.getGamesByQuery(req.query.search_line, function(err, games){

    if (err){res.render('error');}
    else {

      for (var i = 0; i < games.length; i++)
      {
        feed_posts.push({
          href: "/games/" + games[i].name,
          title: games[i].name,
          description: games[i].description
        });
      }

      res.render('search', {feed_posts: feed_posts});
    }
  });
});

module.exports = router;
