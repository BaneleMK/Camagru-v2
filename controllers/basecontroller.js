module.exports = function(app) {
    const User = require('../model/user-model');
    const Post = require('../model/post-model');
    const mongoose = require('mongoose');

    app.get('/', function(req, res){
        if (req.params.page) {
            var page = parseInt(req.params.page, 10);
        } else {
            var page = 0;
        }

        if (page == -1){
            page = 0;
        }

        var postskip = page * 5;
        console.log('postskip = ' + postskip + '\n page = '+ page);
        Post.find().skip( postskip ).sort({_id: -1 }).limit(5).then((data) => {
            res.render('home', {user: req.user, posts: data, page: page});
        });
    });

    app.get('/gallery/:page', function(req, res){
        //res.sendFile('yo dawg you remember ey');
        if (req.params.page) {
            var page = parseInt(req.params.page, 10);
        } else {
            var page = 0;
        }
        
        if (page == -1){
            page = 0;
        }
        
        var postskip = page * 5;
        console.log('postskip = ' + postskip + '\n page = '+ page);
        Post.find().skip( postskip ).sort({_id: -1 }).limit(5).then((data) => {
            res.render('home', {user: req.user, posts: data, page: page});
        });
    });
}