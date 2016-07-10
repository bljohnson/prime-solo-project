var mongoose = require('mongoose');
var Schema = mongoose.Schema; // enable use of schema property
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// create userSchema with chosen fields and data type, let MongoDB handle generating _id for each instance
var userSchema = new Schema ({
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true},
}); // end userSchema

// called before adding new user to db. encrypts password
userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	} // end if
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		}); // end bcrypt.hash
	}); // end bcrypt.genSalt
}); // end userSchema.pre

// used by login methods to compare login form password to db password
userSchema.methods.comparePassword = function (candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) {
			return callback(err);
		} // end if
		callback (null, isMatch);
	}); // end bcrypt
}; // end userSchema.methods.comparePassword


// creates model from userSchema called User, and stores in appusers 'collection' of documents within adoptiondb
var User = mongoose.model('appusers', userSchema);

module.exports = User;
