var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  rating{
    type: String,
    required: true
  },
  developer_name{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  }
}, {collection: 'games'}));


var Game = module.exports = mongoose.model('Game', gameSchema);

module.exports.getGame = function(callback,limit) {
   Game.find(callback).limit(limit);

}
module.exports.addGame = function(game,callback,limit) {


}
