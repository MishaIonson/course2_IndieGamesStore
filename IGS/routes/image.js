var express = require('express');
var router = express.Router();
User = require('../models/user');
Game = require('../models/game');
Article = require('../models/article');

router.get('/articles/:article_title', function(req, res, next) {
  Article.getImage(req.params.article_title, function(image){

    res.writeHead(200, {
       'Content-Type': 'image/png',
       'Content-Length': image.length
    });

    res.end(image);
  });
});

module.exports = router;
