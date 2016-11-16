var express = require('express');
var router = express.Router();

Game = require('../models/game');

router.get('/*', function(req, res, next) {

  var pathString = req.path.substr(1);
  pathString = decodeURI(pathString);

  Game.getGame(pathString, function(err, games){

    if (err){res.render('error');}
    else {

      var game = {
        price: games[0].price,
        name: games[0].name,
        rating: games[0].rating,
        description: games[0].description,
        imagePath: "empty.jpg" /*@TODO*/
      }

      res.render('games', {game});
    }
  });


  // var game = {
  //   name: "Assasin's Creed",
  //   rating: 7.8,
  //   price: 19.99,
  //   description: "Assassin's Creed is an action-adventure video-game series created by Ubisoft that consists of nine main games and a number of supporting materials. The games have appeared on the PlayStation 3, PlayStation 4, Xbox 360, Xbox One, Microsoft Windows, OS X, Nintendo DS, PlayStation Portable, PlayStation Vita, iOS, HP webOS,[1] Android, Nokia Symbian Windows Phone platforms, and Wii U.The games are set in a fictional history of real-world events and follows the centuries-old struggle between the Assassins, who fight for peace with free will, and the Templars, who desire peace through control. The main games in the franchise were developed by Ubisoft Montreal for the single player and Ubisoft Annecy for the multiplayer, with the handheld titles developed by Gameloft and Gryptonite Studios, with additional development by Ubisoft Montreal. The series has been well received by the public and critics, and has sold over 93 million copies as of June 2015, becoming Ubisoft's best selling franchise.[2] The series took inspiration from the novel Alamut by the Slovenian writer Vladimir Bartol,[3] while building upon concepts from the Prince of Persia series.[4]",
  //   imagePath: "empty.jpg"
  // };
  //
  // res.render('games', {game});
});

module.exports = router;
