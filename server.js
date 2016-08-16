var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./user-model');

var app = express();

var jsonParser = bodyParser.json();

app.post('/users', jsonParser, function(req, res) {
	function resStatusMessage(status, message) {
		res.status(status).json(message);
	}

	if (!req.complete) {
		return resStatusMessage(400, { message: 'Invalid body data' });
	}

	if (!('username' in req.body)) {
		return resStatusMessage(422, { message: 'Missing field: username' });
	}

	var username = req.body.username;

	if (typeof username !== 'string') {
		return resStatusMessage(422, { message: 'Incorrect field type: username'});
	}

	username = username.trim();

	if (username === '') {
		return resStatusMessage(422, { message: 'Incorrect field length: username' });
	}

	if (!('password' in req.body)) {
		return resStatusMessage(422, { message: 'Mising field: password' });
	}

	var password = req.body.password;

	if (typeof password !== 'string') {
		return resStatusMessage(422, { message: 'Incorrect field type: password' });
	}

	password = password.trim();

	if (password === '') {
		return resStatusMessage(422, { message: 'Incorrect field length: password' });
	}

	var user = new User({
		username: username,
		password: password
	});

	user.save(function(err) {
		if(err) {
			return resStatusMessage(500, { message: 'Internal server error' });
		} else {
			console.log('User created');
			return resStatusMessage(201, {});
		}
	
	});


});

mongoose.connect('mongodb://localhost/auth').then(function() {
	app.listen(8080);
	console.log('Connected to MongoDB and listening on port 8080');
	User.find(function(err, users) {
		console.log(users);
	});
});
