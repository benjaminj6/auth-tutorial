var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./user-model');
var bcrypt = require('bcryptjs');

var app = express();
app.use(bodyParser.json());

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var strategy = new BasicStrategy(function(username, password, callback) {
	User.findOne({
		username: username
	}, function(err, user) {
		if (err) {
			callback(err);
			return;
		} else if (!user) {
			return callback(null, false, {
				message: 'Incorrect username'
			});
		} else {
			user.validatePassword(password, function(err, isValid) {
				if (err) {
					return callback(err);
				} else if (!isValid) {
					return callback(null, false, {
						message: 'Incoorect password.'
					});
				} else {
					return callback(null, user);
				}
			});
		}
	});
});

passport.use(strategy);

app.post('/users', function(req, res) {
	function resStatusMessage(status, message) {
		res.status(status).json(message);
	}

	if (!req.complete) {
		resStatusMessage(400, { message: 'Invalid body data' });
	}

	if (!('username' in req.body)) {
		resStatusMessage(422, { message: 'Missing field: username' });
	}

	var username = req.body.username;

	// TO DO -- Shouldn't this happen in the user schema?
	if (typeof username !== 'string') {
		resStatusMessage(422, { message: 'Incorrect field type: username'});
	}

	username = username.trim();

	// TO DO -- move this to the user schema
	if (username === '') {
		resStatusMessage(422, { message: 'Incorrect field length: username' });
	}

	if (!('password' in req.body)) {
		resStatusMessage(422, { message: 'Mising field: password' });
	}

	var password = req.body.password;

	// TO DO -- move this validation to the user schema
	if (typeof password !== 'string') {
		resStatusMessage(422, { message: 'Incorrect field type: password' });
	}

	password = password.trim();

	// TO DO -- move this validation to the user schema
	if (password === '') {
		resStatusMessage(422, { message: 'Incorrect field length: password' });
	}

	// TO DO -- is there a way to move this to its own module / middleware or something?
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			resStatusMessage(500, { message: 'Internal Server Error 54' });
		}
			
		bcrypt.hash(password, salt, function(err, hash) {
			if (err) {
				resStatusMessage(500, { message: 'Internal Server Error 59' });
			} else {
				var user = new User({
					username: username,
					password: hash
				});

				user.save(function(err) {
					if(err) {
						resStatusMessage(500, { message: 'Internal server error 68' });
					} else {
						console.log('User created');
						resStatusMessage(201, {});
					}
				}); 
			}
		});
	});
});


// Private endpoint with authentication
app.use(passport.initialize());

app.get('/hidden', passport.authenticate('basic', {session: false}), function(req, res) {
	res.json({
		message: 'Luke...I am your father'
	});
});

mongoose.connect('mongodb://localhost/auth').then(function() {
	app.listen(8080);
	console.log('Connected to MongoDB and listening on port 8080');
	User.find(function(err, users) {
		console.log(users);
	});
});
