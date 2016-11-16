var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('new_article');
});

router.post('/', function(req, res, next){
  res.render('new_article');
});

module.exports = router;
