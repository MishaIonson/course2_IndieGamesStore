var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img: { data: Buffer, contentType: String }
}, {collection: 'images'});

var Image = mongoose.model('Image', imageSchema);

module.exports.getImage = function(name, callback){
  var q = {name: name};
  Image.findOne(q, callback);
}

module.exports.addImage = function(image, callback){
  image.save(callback);
}
