var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./user.model');
var Controller = require('./user.controller');

router.post('/signup', Controller.signup);

module.exports = router;