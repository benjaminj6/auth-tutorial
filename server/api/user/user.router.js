var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./user.model');


router.post('/signup', function(req, res) {
		console.log('we made it to the /signup endpoint');
		// var password = req.body.password;
		// var username = req.body.username;

		// bcrypt.hash(password, 10, function(err, hash) {
		// 	var user = new User({
		// 		username: username,
		// 		password: hash
		// 	});
		// });

		// user.save(function(err) {
		// 	if (err) {
		// 		res.status(500).json({ message: 'failed to save the user in database' });
		// 	} else {
		// 		res.status(201).json(user);
		// 	}
		// });
    // creates a new user in db when user posts to /newuser
});

module.exports = router;