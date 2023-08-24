const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
  userId: {
    type:String,
    ref: 'user', 
    required: true
  },
  username: String,
  title: String,
  content: String,
  category: String,
  date: String,
  likes: Number,
  comments: Array
});

const BlogModel = mongoose.model('blog', BlogSchema);
module.exports = {
  BlogModel
};
