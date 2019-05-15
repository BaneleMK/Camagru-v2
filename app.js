const express = require('express')
const controller = require('./controllers/basecontroller')
const authRouter = require('./routes/auth-routes')
const profileRouter = require('./routes/profile-routes')
const userRouter = require('./routes/user-routes')
const User = require('./model/user-model');
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const passport = require('passport')

// cookiesession is essentially needed for security since it will encrypt the cookie data using a key
const cookieSession = require('cookie-session')
// require('./connection')

const app = express()

app.set('view engine', 'ejs')


// using the cookiesession
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

// initialize passport. (for cookie use?)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

// setting up some routes / middle ware
app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/user', userRouter)

app.use(express.static('./public'))

mongoose.connect(keys.mongodb.dbURL, {useNewUrlParser: true }, () =>{
    console.log('connected to mongoose')
})

// new ting callback for listening to ports
/*
app.listen(9000, () => {

    console.log('You are now tuned to radio port 9000')

})
*/
// test subject
app.listen(9000, (function(){
    console.log('You are now tuned to radio port 9000')
}))


controller(app)
