var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  games_names_list: [String],
  games_reviewed: [String],
  user_type:{
    type: Number,
    required: true
  },
  description: String,
  image:{
    type: Buffer
  }
}, {collection: 'users'});

var User = module.exports = mongoose.model('User',userSchema);

module.exports.getUsers = function(callback,limit) {
   User.find(callback).limit(limit);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByName = function(name, callback){
  var q = {name: name};
  User.findOne(q, callback);
}

module.exports.getUserByEmail = function(email, callback){
  var q = {email: email};
  User.findOne(q, callback);
}

module.exports.comparePassword = function(accountPassword_hash, formPassword, callback){
  bcrypt.compare(formPassword, accountPassword_hash, function(err, res) {
    if (err){throw err;}

    callback(null, res);
});
}

module.exports.containsUser = function(email, callback){
  var q = {email: email};
  User.findOne(q, function(err, user){
    if (err){callback(false)}

    if (user != null){
      callback(true);
    }
    else {
      callback(false);
    }
  });
}

module.exports.haveReviewedGame = function(user, gameName, callback){
  var reviewed = false;
  for (var i = 0; i < user.games_reviewed.length; i++)
  {
    if (user.games_reviewed[i] === gameName){
      reviewed = true;
      break;
    }
  }
  callback(reviewed);
}

module.exports.addUser = function(user,callback) {
  const saltRounds = 10;

  bcrypt.hash(user.password, saltRounds, function(err, hashPassword){
    user.password = hashPassword;
    user.save(callback);
  });
}

module.exports.getImage = function(email, callback){
  User.findOne({email: email}, function(err, user){
    if (err)
    return;

    callback(user.image);
  });
}
