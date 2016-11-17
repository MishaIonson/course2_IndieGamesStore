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
  user_type:{
    type: Number,
    required: true
  },
  description: String
}, {collection: 'users'});

var User = module.exports = mongoose.model('User',userSchema);

module.exports.getUsers = function(callback,limit) {
   User.find(callback).limit(limit);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
  var q = {email: email};
  User.findOne(q, function(err, user){
    callback(err, user);
  });
}

module.exports.comparePassword = function(accountPassword_hash, formPassword, callback){
  bcrypt.compare(formPassword, accountPassword_hash, function(err, res) {
    if (err){throw err;}

    callback(null, res);
});
}


module.exports.addUser = function(user,callback) {
  const saltRounds = 10;

  bcrypt.hash(user.password, saltRounds, function(err, hashPassword){
    user.password = hashPassword;
    user.save(callback);
  });
}
