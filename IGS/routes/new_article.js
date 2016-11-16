var express = require('express');
var router = express.Router();

var Artice = require('../models/article');

router.get('/', function(req, res, next) {
  res.render('new_article');
});

router.post('/', function(req, res, next){

  var newArticle = new Article({
    title: req.body.title,
    picture_url: 'empty.jpg', /*@TODO*/
    description: req.body.description
  });

  Article.addArticle(newArticle, function(err, article){
    if (err){
      throw err;
    }
    else {
      res.redirect('index');
    }
  });
});

module.exports = router;
