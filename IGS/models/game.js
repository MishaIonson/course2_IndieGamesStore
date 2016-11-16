var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  rating{
    type: double,
    required: true
  },
  page_url:{
    type: String,
    required: true
  },
  logo_url:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  file_url:{
    type: String,
    required: true
  }
});
