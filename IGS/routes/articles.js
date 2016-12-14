var express = require('express');
var router = express.Router();
var csrf = require('csurf');

Article = require('../models/article');

router.get('/*', csrf({ cookie: true }), function(req, res, next) {

  var pathString = req.path.substr(1);
  pathString = decodeURI(pathString);

  Article.containsArticle(pathString, function(contains){
    if (contains)
    {
      Article.getArticle(pathString, function(err, articles){

        if (err){res.render('error');}
        else {

          var article = {
            imagePath: articles[0].title,
            title: articles[0].title,
            description: articles[0].description
          };

          res.render('articles', {article,  csrfToken: req.csrfToken() });
        }
      });
    }
    else{
      res.render('error');
    }
  });


});

router.post('/*', csrf({ cookie: true }), function(req, res, next) {

  var pathString = req.path.substr(1);
  pathString = decodeURI(pathString);

  Article.containsArticle(pathString, function(contains){
    if (contains)
    {
      Article.deleteArticle(pathString, function(err){
        if (err){throw err;}

        res.redirect('/');
      });
    }
    else{
      res.render('error');
    }
  });


});

module.exports = router;
