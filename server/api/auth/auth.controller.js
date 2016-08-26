var User = require('../user/user.model');

function Auth() {}

Auth.prototype.logout = function() {};
Auth.prototype.register = function() {};

Auth.prototype.unauthorized = function(req, res) {
	res.status(401).json({message: 'Wrong user name and password!'});
};

Auth.prototype.me = function(req, res) {
	console.log('At Auth.me')
	User.findById(req.user.id, function(error, user){
		if(error) {
			console.log(error);
		} else {
			res.status(200).json(user);
		}
	});
};

module.exports = Auth.prototype;