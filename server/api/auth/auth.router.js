var express = require('express');
var passport = require('passport');
var router = express.Router();
var controller = require('./auth.controller');

router.post('/login',

	// Does using authenticate with 'local' as the first argument use the localStrategy defined in the middleware.express.js?
    passport.authenticate('local', {
        successRedirect: '/auth/me',
        failureRedirect: '/auth/unauthorized'
    })
);

router.post('/register', function(req, res) {
    // do something when user posts to /login
});

router.get('/unauthorized', controller.unauthorized);
router.get('/me', controller.me);

module.exports = router;
