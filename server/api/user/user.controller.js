var User = require('./user.model');
var bcrypt = require('bcrypt');

var Controller = {};

Controller.signup = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var saltRounds = 10;

	bcrypt.hash(password, saltRounds, function(err, hash) {
		if (err) {
			res.status(500).json({ message: 'There was an error hashing the password' });
			return;
		} else {
			password = hash;
		
			// had to put inside the else statement bc of async callback on bcrypt.hash
			// ask RE: whether there is a better way to do this
			User.create({username: username, password: password}, function(err, user) {
				if (err) {
					res.status(500).json(err);
				} else {
					res.status(201).json(user);
				}
			});
		}
	});
};

module.exports = Controller;