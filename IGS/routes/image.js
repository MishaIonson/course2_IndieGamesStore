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

router.get('/games/:games_name', function(req, res, next) {
  Game.getImage(req.params.games_name, function(image){

    res.writeHead(200, {
       'Content-Type': 'image/png',
       'Content-Length': image.length
    });

    res.end(image);
  });
});

router.get('/users/:email', function(req, res, next) {
  User.getImage(req.params.email, function(image){

    res.writeHead(200, {
       'Content-Type': 'image/png',
       'Content-Length': image.length
    });

    res.end(image);
  });
});

module.exports = router;
