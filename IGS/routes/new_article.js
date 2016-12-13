var express = require('express');
var router = express.Router();

var Artice = require('../models/article');

router.get('/', ensureAuthenticated, function(req, res) {
  res.render('new_article');
});

router.post('/', ensureAuthenticated, function(req, res){

  if(req.files){
    var newArticle = new Article({
      title: req.body.title,
      description: req.body.description,
      image: req.files.picture.data
    });

    Article.addArticle(newArticle, function(err){
      if (err){throw err;}

      res.redirect('index');
    });
  }

  // var newArticle = new Article({
  //   title: req.body.title,
  //   description: req.body.description
  // });
  //
  // if (req.files)
  // {
  //   var picture = req.files.picture;
  //   picture.mv('./public/images/articles/' + newArticle.title + ".png", function(err){
  //     if (err)
  //       res.status(500).send(err);
  //   });
  // }
  //
  // Article.addArticle(newArticle, function(err, article){
  //   if (err){
  //     throw err;
  //   }
  //   else {
  //     res.redirect('index');
  //   }
  // });
});


function ensureAuthenticated(req, res, next){
	if((req.isAuthenticated()) && (res.locals.user.user_type == 0)){
		return next();
	} else {
		res.redirect('/index');
	}
}

module.exports = router;
