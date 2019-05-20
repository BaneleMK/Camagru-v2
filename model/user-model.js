const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    googleid: String,
    password: String,
    email: String,
    code: Number,
    verified: Boolean,
    e_notification: Boolean,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;