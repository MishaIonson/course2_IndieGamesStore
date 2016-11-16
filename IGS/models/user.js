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
module.exports.addUser = function(user,callback) {
  const saltRounds = 10;

  bcrypt.hash(user.password, saltRounds, function(err, hashPassword){
    user.password = hashPassword;
    user.save(callback);
  });
}
