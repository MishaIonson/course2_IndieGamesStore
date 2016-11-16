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

module.exports.getArticles = function(callback,limit) {
   Article.find(callback).limit(limit);
}

module.exports.getArticle = function(titleInput, callback){
  Article.find({"title": titleInput}, callback);
}

module.exports.addArticle = function(article,callback) {
  article.save(callback);
}
