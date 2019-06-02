const router = require('express').Router();
const User = require('../model/user-model');
const passport = require('passport');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const key = require('../config/keys');
const nodemailer = require('nodemailer');


var urlencodedParser = bodyParser.urlencoded({ extended: false })

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    }
    next();
};

router.get('/', authCheck, (req, res) =>{
    res.render('profile', {user: req.user});
    //console.log(req.body)
});

router.post('/:type', urlencodedParser, (req, res) =>{
    var type = req.params.type;

    if (type == 'username'){
        User.findOne({username: req.body.newusername}, function(err, result){
            if (result){
                res.send('username already in use');
            } else {
                User.findOne({username: req.user.username}).then(function(currentUser){
                    if (currentUser){                
                        bcrypt.compare(req.body.password, currentUser.password, function(err, result){
                            if (result) {
                                User.findOneAndUpdate({username: req.user.username}, {username: req.body.newusername}).then((result) => {
                                    if (result){
                                        console.log('username change complete :'+result);
                                        req.logOut();
                                        res.redirect('/');
                                    } else {
                                        console.log('hmmmmmmm? :'+result);
                                    }
                                });
                            } else {
                                console.log('wrong password');
                            }
                        });
                    } else{
                        console.log('user invalid? impossible outcome');
                    }
                });
            }
        });
    } else if (type == 'password'){
        if (req.body.newpassword !== req.body.newpassword_vr){
            res.send('passwords dont match')
        } else {
            User.findOne({username: req.user.username}).then(function(currentUser){
                console.log(currentUser);
                if (currentUser){                
                    bcrypt.compare(req.body.oldpassword, currentUser.password, function(err, result){
                        if (result) {
                            bcrypt.hash(req.body.newpassword, 10, function(err, newpass) {
                                User.findOneAndUpdate({username: req.user.username}, {password: newpass}).then((result) => {
                                    if (result){
                                        console.log('password change complete :'+result);
                                        req.logOut();
                                        res.redirect('/');
                                    } else {
                                        console.log('hmmmmmmm? :'+result);
                                    }
                                });
                            });
                        } else {
                            console.log('wrong password');
                        }
                    });
                } else{
                    console.log('user invalid? impossible outcome');
                    res.send('404 SOMETHING WENT WRONG');
                }
            });
        }
    } else if (type == 'email'){
        User.findOne({email: req.body.newemail}, function(err, result){
            if (result){
                res.send('email already in use');
            } else {
                User.findOne({username: req.user.username}).then(function(currentUser){
                    if (currentUser){                
                        bcrypt.compare(req.body.password, currentUser.password, function(err, result){
                            if (result) {
                                var code = Math.random();

                                User.findOneAndUpdate({username: req.user.username}, {code: code}).then((result) => {
                                    if (result){
                                        console.log('user code changed');
                                    } else {
                                        console.log('user code HAS NOT changed, you may be in trouble friend');                                            
                                    }
                                }).then(() => {
                                    async function main(){
                                        var email_message = "\hello dear, user So i need you to follow this link in order for me to change your email http://localhost:9000/profile/newemail/"+ req.user._id +"/"+ req.body.newemail +"/"+ code;
    
                                        
                                        const transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                          auth: {
                                            user: key.gmailemail.email,
                                            pass: key.gmailemail.password,
                                          },
                                        });
    
                                        let info = await transporter.sendMail({
                                            from: 'thybaneard@gmail.com', // sender address
                                            to: req.body.newemail, // list of receivers
                                            subject: "Trender email verification", // Subject line
                                            text: email_message, // plain text body
                                        });
                                    }
                                
                                    main().catch(console.error);
                                    console.log('email sent');
                                })
                                res.render('profile', {user: req.user});

                                // launch email function
                            } else {
                                console.log('wrong password');
                            }
                        });
                    } else{
                        console.log('user invalid? impossible outcome');
                    }
                });
            }
        });
    } else if (type == 'comments'){
        User.findOneAndUpdate({username: req.user.username}, {e_notification: req.body.e_notification}).then((result) => {
            if (result){
                console.log('notifications changed to : ' + result.e_notification);
            } else {
                console.log('hmmmmmmm? error in changing notifications');
            }
        }); 
    }
    res.render('profile', {user: req.user});
    
});

router.get('/newemail/:id/:email/:code', (req, res) =>{
    User.findOneAndUpdate({_id: req.params.id, code: req.params.code}, {email: req.params.email}).then((result) => {
        if (result){
            console.log('email change complete :'+result);
        } else {
            console.log('to debuger: id and code dont match');
        }
    });
    res.render('home', {user: req.user});
});

module.exports = router;