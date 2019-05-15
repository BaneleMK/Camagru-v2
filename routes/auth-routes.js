const router = require('express').Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('../model/user-model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const key = require('../config/keys');


var urlencodedParser = bodyParser.urlencoded({ extended: false })

// login route
router.get('/signup', (req, res) =>{
    res.render('signup');
});


router.get('/login', (req, res) =>{
    //res.send('you are logged in user ' + req.user.username);
    res.render('login');
});

router.post('/login', urlencodedParser, 
    passport.authenticate('local', { failureRedirect: '/auth/login' }), (req, res) =>{
    console.log(req.body)
    res.redirect('/');
    
    // validate user

    /*User.findOne({ username: req.body.username}).then(function(currentUser){
        console.log(currentUser);
        if (currentUser){

            bcrypt.compare(req.body.password, currentUser.password, function(err, result){
                if (result) {
                    console.log('USER FOUND AND MATCHED, current user id:' + currentUser.id);
                    passport.serializeUser((currentUser, done)=> {
                        // the 1st param is for errors but was set to null due to knowing that user will always be available when called on
                        // since we pass it in
                        done(null, currentUser.id);
                    });
                    res.redirect('/');
                } else {
                    res.send('Who You Tryna Scam Punk?...maybe you made a mistake tyagain');
                }
            });
        } else{
            res.send('dis user dont exist bruduh');
        }
    });*/

    // redirect them to home
    // res.render('home', {user: req.user});
});

router.get('/signup', (req, res) =>{
    //res.send('you are logged in user ' + req.user.username);
    res.render('signup');
});


router.get('/sendmail', urlencodedParser, (req, res) =>{
// async..await is not allowed in global scope, must use a wrapper
async function main(){

        var code = Math.random();
        console.log('the code nuimber is ' + "code");
        var email_message = "\
            hello dear user\
            \
            So i need you to follow this link in order for me to to verify your account http://localhost:9000/auth/emailverif/"+ req.body.username +"/" + code;

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: key.gmailemail.email,
          pass: key.gmailemail.password,
      },
      /*tls: {
        rejectUnauthorized: false
      }*/
  });
  
    // send mail with defined transport object
    console.log("Transporter made");
    let mailOptions = {
      from: 'thybaneard@gmail.com', // sender address
      to: 'carpool@mailinator.com', // list of receivers
      subject: "Hello ✔", // Subject line
      text: email_message, // plain text body
    };
    
    transporter.sendMail(mailOptions, function(err, data){
        if (err){
            console.log(err);
        } else {
            console.log('email sent go check i bet its not there lol');
        }
    });
  
    //console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
      main().catch(console.error);
    res.send('Check mail');

});

router.post('/signup', urlencodedParser, (req, res) =>{
    console.log(req.body)
    
    // validate user data

    if (req.body.password !== req.body.password_vr){
        res.send('passwords dont match')
    }

    var code = Math.random();
    
    // hash password
    bcrypt.hash(req.body.password, 10, function(err, newpass) {

        // check if user exists

        User.findOne({username: req.body.username}, function(err, result){
            if (result){
                res.send('username already in use');
            } else {
                User.findOne({email: req.body.email}, function(err, result) {
                    if (result){
                        res.send('email already in use');
                    } else {
                        // store data
                        
                        new User({
                            username: req.body.username,
                            password: newpass,
                            email: req.body.email,
                            code: code,
                            verified: false
                        }).save().then((newuser) => {
                            // right here we are putting the users information in a cookie (like a php session)
                            console.log('new user created with info: ' + newuser);
                        });
                    }
                });
            }
        })
    });
    
    // send verif email
    
    
    // async..await is not allowed in global scope, must use a wrapper
    async function main(){
        
        // Generate test SMTP service account from ethereal.email
    console.log('the code nuimber is ' + "code");
    var email_message = "\hello dear, user So i need you to follow this link in order for me to to verify your account http://localhost:9000/auth/emailverif/"+ req.body.username +"/" + code;
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
        service: 'gmail',
      auth: {
        user: key.gmailemail.email,
        pass: key.gmailemail.password,
      },
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'thybaneard@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: "Trender email verification", // Subject line
    text: email_message, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

    main().catch(console.error);
    console.log('email sent');

    // redirect them to login

    res.redirect('/');
    // res.render('login');
});

router.get('/logout', (req, res) =>{
    req.logOut();
    res.redirect('/');
});

router.get('/emailverif/:user/:code', (req, res) =>{


    var username = req.params.user;
    var code = req.params.code;
    console.log('i made it back yey...what next? user is '+username+' code is '+code);
    User.findOne({username: username, code: code}, function(err, result){
        if (err)
            throw err;
        else if (result){
            if (result.verified === false) {
                console.log('lets verfy you '+ result.verified);
                User.findOneAndUpdate({username: username}, {verified: true}, (result) =>{
                    console.log('verifying you now...');
                    res.render('login', {state: 'verified'});
                });
                //res.send('something went wrong for some reason with updating your status');
            } else {
                console.log('Already verified friend see [Status : '+ result.verified+' ]');
                res.render('login', {state: 'verified'});
            }
        } else {
            console.log('we dont know what you\'re trying. do that again and ill delete your roblox account');        
            res.render('home');
        }
    });

    //res.send('back from mail');                               
})                                                                ;

// google auth route
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to

router.get('/google/redirect', passport.authenticate('google'), (req, res) =>{
    //res.send(req.user);
    res.redirect('/');
});

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
module.exports = router;