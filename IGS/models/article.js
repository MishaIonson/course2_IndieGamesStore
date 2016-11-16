var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  picture_url:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  }
}, {collection: 'articles'});

var Article = module.exports = mongoose.model('Article',articleSchema);

module.exports.getAricles = function(callback,limit) {
   Article.find(callback).limit(limit);
}
module.exports.addAricle = function(article,callback,limit) {


}
