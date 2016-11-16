var mongoose = require('mongoose');

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
  console.log('comes here');
  user.save(callback);
  console.log('here two');
}
