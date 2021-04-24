const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User.model')
const flash = require('connect-flash')

module.exports = (app) =>{
    passport.serializeUser((user, cb) =>{ cb(null, user._id)});
    passport.deserializeUser((id, cb) =>{
        User.findById(id)
        .then((user) => cb(null, user))
        .catch(error => cb(error))
    })
    app.use(flash())

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true}, (req, email, password, next ) =>{
        User.findOne({email})
        .then(email =>{
            if(!email){
                return(null, false, {message: 'Wrong user or password'})
            }
            if(bcrypt.compareSync(password, user.password)){
                return next(null, user)
            }else{
                return next(null, false, {message: 'Wrong user or password'})
            }
        })
        .catch(error => next(error))
    }))
    app.use(passport.initialize());
    app.use(passport.session());
}
