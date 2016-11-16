var express = require('express');
var router = express.Router();

Article = require('../models/article');

router.get('/*', function(req, res, next) {

  var pathString = req.path.substr(1);
  pathString = decodeURI(pathString);

  console.log(pathString);

  Article.getArticle(pathString, function(err, articles){

    if (err){res.render('error');}
    else {

      var article = {
        imagePath: 'empty.jpg', /*@TODO*/
        title: articles[0].title,
        description: articles[0].description
      };

      res.render('articles', {article});
    }
  });
});

module.exports = router;
