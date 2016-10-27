var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next) {

  // console.log("Searched: " + req.query.search_line);

  

  res.render('search');
});

module.exports = router;
