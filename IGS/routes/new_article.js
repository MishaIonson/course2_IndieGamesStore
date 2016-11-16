var express = require('express');
var router = express.Router();

var Artice = require('../models/article');

router.get('/', function(req, res, next) {
  res.render('new_article');
});

router.post('/', function(req, res, next){

  var newArticle = new Article({
    title: req.body.title,
    description: req.body.description
  });

  if (req.files)
  {
    var picture = req.files.picture;
    picture.mv('./public/images/articles/' + newArticle.title + ".png", function(err){
      if (err)
        res.status(500).send(err);
    });
  }

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
