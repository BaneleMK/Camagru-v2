module.exports = function(app) {
    const User = require('../model/user-model');
    const mongoose = require('mongoose');

    app.get('/', function(req, res){
        //res.sendFile('yo dawg you remember ey');
        User.find().then((data) =>{
            if (req.params.page) {
                var page = parseInt(req.params.page, 10);
            } else {
                var page = 0;
            }
            res.render('home', {user: req.user, posts: data.posts, page: parseInt(0, 10)});
        });
    });

    app.get('/gallery/:page', function(req, res){
        //res.sendFile('yo dawg you remember ey');
        User.find().then((data) => {
            if (req.params.page) {
                var page = parseInt(req.params.page, 10);
            } else {
                var page = 0;
            }
            res.render('home', {user: req.user, posts: data.posts, page: page});
        });
    });
}