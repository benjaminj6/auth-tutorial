var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});



UserSchema.methods.validatePassword = function(password, callback) {

  // if (this.password === password) {
  //   callback(null, true);
  // } else {
  //   var error = new Error({ message: 'Password did not match!', status: 401 });
  //   callback(error, null);
  // }

  bcrypt.compare(password, hash, function(err, res) {
    if (res) {
      callback(null, res);
    } else {
      var error = new Error({ message: 'Password did not match!', status: 401 });
      callback(error, null);
    }
  })
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
