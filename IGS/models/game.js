var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  rating:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  developer_name:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  }
}, {collection: 'games'});


var Game = module.exports = mongoose.model('Game', gameSchema);

module.exports.getGames = function(callback) {
   Game.find(callback);
}

module.exports.getGamesByQuery = function(queryInput, callback){
  Game.find(function(err, gamesList){
    var chosenList = [];
    queryInput = queryInput.toLowerCase();
    for (var i = 0; i < gamesList.length; i++)
    {
      if (gamesList[i].name.toLowerCase().includes(queryInput)){
        chosenList.push(gamesList[i]);
      }
    }
    callback(err, chosenList);
  });
}

module.exports.containsGame = function(name, callback){
  var q = {name: name};
  Game.findOne(q, function(err, game){
    if (err){throw err;}

    if (game != null){
      callback(true);
    }
    else {
      callback(false);
    }
  });
}

module.exports.getGame = function(nameInput, callback){
  Game.find({"name": nameInput}, callback);
}
