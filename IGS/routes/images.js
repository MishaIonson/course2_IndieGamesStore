var express = require('express');
var router = express.Router();

var Image = require('../models/image');

router.get('/:name', function(req, res, next) {

  Image.getImage(req.params.name, function(err, image){
    if (err){throw err;}

    if (image === null)
      res.redirect('error');
    else{
      res.send(image.img);
    }
  });
});
