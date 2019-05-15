const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local');
const keys = require('./keys');
const User = require('../model/user-model');
const bcrypt = require('bcrypt');

// this step right here is defining what we will store in our cookie with passport
passport.serializeUser((user, done)=> {
    // the 1st param is for errors but was set to null due to knowing that user will always be available when called on
    // since we pass it in
    done(null, user.id)
});

// this step right here is defining what we will retrieve in our browsers cookie with passport
passport.deserializeUser((id, done)=> {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
    // the strategy options go here

    // quick note to self or future reader. the tutorial i used was depricated because the google+ API was
    // shut down. so now im using some new information from google about how to use their auth along with the 
    // depricated net ninja tutorial on passport Youtube. enjoy :D

    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL:'http://localhost:9000/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport call back function
        var email = profile.emails[0].value;
        console.log('launching the callback function');
        console.log('email is: ' + email);
        //done();

        User.findOne({ googleid: profile.id}).then(function(currentUser){
            //if (currentUser.googleid !== profile.id){
            if (!currentUser){
                new User({
                    username: profile.displayName,
                    googleid: profile.id,
                    email: email,
                    password: "none",
                }).save().then((newuser) => {
                    console.log('googleid = ' + currentUser.id + 'mongo profile id =' + profile.id);
                    console.log('new user created with info: ' + newuser)

                    // right here we are putting the users information in a cookie (like a php session)
                    done(null, newuser);
                });
            } else {
                console.log('welcome back: ' + profile);

                // right here we are putting the users information in a cookie (like a php session)
                done(null, currentUser);
            }
            
        });
    })
);


passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username}).then(function(currentUser){
            console.log(currentUser);
            if (currentUser){                
                bcrypt.compare(password, currentUser.password, function(err, result){
                    if (result) {
                        if(currentUser.verified === false){
                            console.log('account not verified');
                            return done(null, false);
                        } else
                            return done(null, currentUser)
                    } else {
                        console.log('wrong password');
                        return done(null, false)
                    }
                });
            } else{
                console.log('wrong username');
                return done(null, false)
            }
        });
    })
);
