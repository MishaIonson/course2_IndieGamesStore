var express = require('express');
var router = express.Router();

Article = require('../models/article');

router.get('/', function(req, res, next) {

  var posts = [];

  Article.getArticles(function(err, articles){
    if (err)
    {
      res.render('error');
    }
    else {
      for (var i = 0; i < articles.length; i++)
      {
        posts.push({
          href: "index",/*@TODO: change to articles full page*/
          title: articles[i].title,
          imagePath: articles[i].picture_url
        });
      }
      res.render('index', {posts: posts});
    }
  });

});

module.exports = router;
