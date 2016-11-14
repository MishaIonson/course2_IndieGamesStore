var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next) {

  // console.log("Searched: " + req.query.search_line);
  var feed_posts = [];

  // @TODO: put useful data
  for (var i = 0; i < 10; i++)
  {
    feed_posts.push({
      href: "search",
      imagePath: "empty.jpg",
      title: "BethesdaGames",
      description:"American video game developer, acting as in-house development team for parent company Bethesda Softworks, established in 2001. Previously synonymous with parent publisher Bethesda Softworks, the studio's name and logo were established with the release of The Elder Scrolls III: Morrowind in 2002. The studio is currently led by executive producer Todd Howard. A second studio, Bethesda Game Studios Montreal, was opened in Montreal, Canada."
    });
  }


  res.render('search', {feed_posts: feed_posts});
});

module.exports = router;
