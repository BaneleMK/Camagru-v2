const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../model/user-model');
const fs = require('fs');
// to generate unique names
const uniqid = require('uniqid');
// to merge images
const jimp = require('jimp');
// the next is to allow for picture uploads and handles m ultipart/form-data
const multer = require('multer');
const upload = multer({dest: __dirname + '/../public/uploads'});

// remind me why we require passport? hmmm... i think its only for the google auth on the other routes
const passport = require('passport');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    }
    next();
};

var urlencodedParser = bodyParser.urlencoded({ extended: false })

//import mergeImages from 'merge-images';

// all get methods
router.get('/', authCheck, (req, res) =>{

    
    //res.send('you are logged in user ' + req.user.username);
    res.render('', {user: req.user});
});
      
router.get('/post', authCheck, (req, res) =>{
    //res.send('you are logged in user ' + req.user.username);
    res.render('post', {user: req.user});
});

router.post('/upload', authCheck, urlencodedParser, upload.single('photo'), (req, res) =>{
    var imagename = uniqid() + '.png';
    var path = "public/uploads/";
    var storage_path = "/uploads/";
    if (req.file){
        console.log("file = to this = " + req.file.path);
        var imagedest1 = req.file.path;
        //res.json(req.file);
    } else {
        //throw 'error';

        rawbase64string = req.body.webcampic;
        b64image = rawbase64string.replace('data:image\/png;base64,', '');

        // storing the images in public
        var imagedest1 = path+"stock_"+imagename;
        
        // with this we are generating the image
        var image = Buffer.from(b64image, 'base64');

        // we then write the imgae to a file
        fs.writeFile(imagedest1, image, (err) => {
            if (err)
                console.log(err);
            else 
                console.log("image created")
        });
    }
    var images = [imagedest1, 'public/assets/'+req.body.sticker0, 'public/assets/'+req.body.sticker1, 'public/assets/'+req.body.sticker2];

    var jimp_imgs = [];

    for (var i = 0; i < images.length; i++){
        if (images[i] != 'public/assets/none') {
            jimp_imgs.push(jimp.read(images[i]));
            console.log('image number '+i+' from images: '+images[i]);
        }
    }

    Promise.all(jimp_imgs).then((data) =>{
        return Promise.all(jimp_imgs);
    }).then((data) => {
        let i = 1;
        //console.log(data[0]);

        let width = data[0].bitmap.width;
        let height = data[0].bitmap.height;
        //data[0].resize(1280, 898);
        while (data[i]) {
            data[i].resize(width, height);
            //console.log(data[i]);
            data[0].composite(data[i],0,0);
            i++;
        }
        data[0].write(path+imagename, (err) =>{
            if (err)
                throw err
            else
            console.log('jimp image created');
        })
        fs.unlink(imagedest1, (err) => {
            if (!err)
                console.log('file deleted');
            else
                throw err;
        });

        // add to database
        User.findOne({username: req.user.username}).then((current_user) =>{
                current_user.posts.push({image: storage_path+imagename});
                current_user.save().then((data) => {
                        console.log('saved to database');
                });
        });
    });
    
    //console.log('req user has: '+ req.user);
    //User.findById(req.user)
    res.render('post', {user: req.user});    
});

router.get('/newemailverification', authCheck, (req, res) =>{
    //res.send('you are logged in user ' + req.user.username);
});

router.get('/comments', authCheck, (req, res) =>{
    //res.send('you are logged in user ' + req.user.username);
    res.render('comments', {user: req.user});
});

router.get('/viewposts/:page', authCheck, (req, res) =>{
    //res.send('you are logged in user ' + req.user.username);
    User.findOne({username: req.user.username}).then((current_user) =>{
        if (current_user) {
            if (req.params.page) {
                var page = parseInt(req.params.page, 10);
            } else {
                var page = 0;
            }
            console.log('page = ' + page);
            res.render('viewposts', {user: req.user, posts: current_user.posts, page: page});
        } else {
            
            console.log('something went wrong with finding the users posts');
            res.render('viewposts', {user: req.user});
        }
    });
});

module.exports = router;