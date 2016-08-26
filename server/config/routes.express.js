var authRouter = require('../api/auth/auth.router');
var userRouter = require('../api/user/user.router');
/*
	Endpoints of the API
	Any future endpoints would be added here along with their own router.
*/
module.exports = function(app) {
	app.use('/auth', authRouter);
	app.use('/signup', userRouter);
};