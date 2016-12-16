var express = require('express');
var router = express.Router();

User = require('../models/user');

router.get('/:developer_name', function(req, res, next) {

  if (req.params.developer_name == null){res.send(404); return;}

  User.getUserByName(req.params.developer_name, function(err, userOut){
    if ((err) || (userOut == null)){res.send(404); return;}

    if (userOut.user_type != 2){res.send(404); return;}

    res.render('developer', {userOut});
  });

});

module.exports = router;
