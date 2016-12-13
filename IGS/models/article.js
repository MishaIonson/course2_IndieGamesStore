var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  image:{
    type: Buffer
  }
}, {collection: 'articles'});

var Article = module.exports = mongoose.model('Article',articleSchema);

module.exports.getArticles = function(callback,limit) {
   Article.find(callback).limit(limit);
}

module.exports.getArticle = function(titleInput, callback){
  Article.find({"title": titleInput}, callback);
}

module.exports.containsArticle = function(title, callback){
  var q = {title: title};
  Article.findOne(q, function(err, article){
    if (err){throw err;}

    if (article != null){
      callback(true);
    }
    else {
      callback(false);
    }
  });
}

module.exports.addArticle = function(article,callback) {
  article.save(callback);
}

module.exports.deleteArticle = function(title, callback){
  Article.findOneAndRemove({title: title}, callback);
}

module.exports.getImage = function(title, callback){
  Article.findOne({title: title}, function(err, article){
    if (err)
    return;

    callback(article.image);
  });
}
