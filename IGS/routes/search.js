var express = require('express');
var router = express.Router();

Game = require('../models/game');

/* GET home page. */
router.get('/*', function(req, res, next) {

  // console.log("Searched: " + req.query.search_line);
  var feed_posts = [];


  Game.getGamesByQuery(req.query.search_line, function(err, games){

    if (err){res.render('error');}
    else {

      for (var i = 0; i < games.length; i++)
      {
        feed_posts.push({
          href: "/games/" + games[i].name,
          imagePath: "games/" + games[i].name + ".png",
          title: games[i].name,
          description: games[i].description
        });
      }

      res.render('search', {feed_posts: feed_posts});
    }
  });


  // for (var i = 0; i < 10; i++)
  // {
  //   feed_posts.push({
  //     href: "search",
  //     imagePath: "empty.jpg",
  //     title: "BethesdaGames",
  //     description:"American video game developer, acting as in-house development team for parent company Bethesda Softworks, established in 2001. Previously synonymous with parent publisher Bethesda Softworks, the studio's name and logo were established with the release of The Elder Scrolls III: Morrowind in 2002. The studio is currently led by executive producer Todd Howard. A second studio, Bethesda Game Studios Montreal, was opened in Montreal, Canada."
  //   });
  // }
});

module.exports = router;
