const mongoose = require('mongoose');

// it seemse as if the mocha require wasn't required at all
//const mocha = require('mocha');

// we are using ES6 promises instead of the mongoose promise so we overide.
// although for me its still producing the deprication error
mongoose.Promise = global.Promise;

// we use before so that this is ran before other test with mocha
before(function(done) {
    // the mongodb connection with the connect method
    mongoose.connect('mongodb://localhost/camagru'), { useNewUrlParser: true };
    //mongoose.connect('mongodb://localhost:27017/testio' , { useNewUrlParser: true });
    // connect to the db else log the error;
    
    mongoose.connection.once('open', function () {
        console.log('thy connection has been created, time for thee to do thy bidding');
        done();
    }).on('error', function (error) {
        console.log('thy error has occured:'.error);
    });
    console.log('connection.js was ran');
});
/*
beforeEach(function(done){
    mongoose.connection.collections.camagru.drop(function(){
        done();
    });
});
*/