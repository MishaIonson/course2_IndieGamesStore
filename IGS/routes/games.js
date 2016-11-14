var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  res.render('top');
});

function weekTop(req, res, next)
{

}

module.exports = router;
