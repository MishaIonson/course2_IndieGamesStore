var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  // @TODO: use the same blank for search and top
  res.render('top');
});

function weekTop(req, res, next)
{

}

module.exports = router;
