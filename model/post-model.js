const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    userid: String,
    comment: String
});

const likeSchema = new Schema({
    userid: String
});

const PostsSchema = new Schema({
    userid: String,
    image: String,
    comments: [CommentsSchema],
    likes: [likeSchema]
});

const Post = mongoose.model('post', PostsSchema);

module.exports = Post;