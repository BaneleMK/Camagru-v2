const express = require('express')
const controller = require('./controllers/basecontroller')
const authRouter = require('./routes/auth-routes')
const profileRouter = require('./routes/profile-routes')
const userRouter = require('./routes/user-routes')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const passport = require('passport')

// note this is not used in this instance but is required to init passport
require('./config/passport-setup')

// cookiesession is essentially needed for security since it will encrypt the cookie data using a key
const cookieSession = require('cookie-session')
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

// test subject
app.listen(9000, (function(){
    console.log('You are now tuned to radio port 9000')
}))

controller(app)
