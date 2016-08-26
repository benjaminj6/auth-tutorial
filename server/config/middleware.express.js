var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../api/user/user.model');
var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function(app) {


    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    
/*  
    QUESTION -- what role does session play? 
    ANSWER -- keeps user logged in once they authenticate.
                In this case it simply opens up a new session 
*/  

    app.use(session({ secret: 'ben the bass player', resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());

/*
    This is the logic that Passport follows to authenticate that the username exists and that the password is correct.
*/

    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); } 

            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username'
                });
            }
            
            user.validatePassword(password, function(err, isValid) {
                if (err) {
                    return done(err);
                } if (!isValid) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                } else {
                    console.log(user);
                    return done(null, user);
                }
            });       
        });
    }));

/*
    Allows the user to stay logged in for any future requests on the session
*/
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

/*
    Allows the user session to be terminated at the end of the session???  
*/    

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
