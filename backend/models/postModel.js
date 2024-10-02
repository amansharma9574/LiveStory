const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  header: { type: String, required: true },
  content: { type: String, required: true, maxlength: 500000 },
  like: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  category: { type: String},
  createdAt: { type: Date, default: Date.now},
  image: {
    type: String },
});



const Post = mongoose.model('Post', postSchema);

module.exports = Post;

