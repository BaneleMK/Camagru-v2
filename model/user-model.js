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
    image: String,
    comments: [CommentsSchema],
    likes: [likeSchema]
});

const UserSchema = new Schema({
    username: String,
    googleid: String,
    password: String,
    email: String,
    code: Number,
    verified: Boolean,
    e_notification: Boolean,
    posts: [PostsSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;