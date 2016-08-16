var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./user-model');

var app = express();

var jsonParser = bodyParser.json();



mongoose.connect('mongodb://localhost/auth').then(function() {
	app.listen(3000);
	console.log('Connected to MongoDB and listening on port 3000');
});
