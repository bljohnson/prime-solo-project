var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema; // enable use of schema property

// create userSchema with chosen fields and data type, let MongoDB handle generating _id for each instance
var userSchema = new Schema ({

// enter fields and data type here. use modules to link to Favorites list and Search Criteria?????
	first_name: {type: String},
	last_name: {type: String},
	username: {type: String},
	password: {type: String},
	email: {type: String},
	zip: {type: Number}

}); // end userSchema

var User = mongoose.model('appusers', userSchema); // creates model from userSchema called User, and stores in appusers 'collection' of documents within adoptiondb

module.exports = User;
