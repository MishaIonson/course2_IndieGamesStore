var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var posts = [];

  // @TODO: put useful data
  for (var i = 0; i < 10; i++)
  {
    posts.push({
      href: "index",
      title: "ASSASIN'S CREED",
      imagePath: "empty.jpg"
    });
  }


  res.render('index', {posts: posts});
});

module.exports = router;
