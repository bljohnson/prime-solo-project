var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel');
var path = require('path');

// handles request for html file
router.get('/', function(req, res, next) {
	res.sendFile(path.resolve('public/views/signup.html'));
}); // end router.get

// handles POST request with new user data
router.post('/', function(req, res, next) {
	User.create(req.body, function(err, post) {
		if (err) {
			next (err);
		} else {
			res.redirect('/');
		}
	}); // end User.create
}); // end router.post

module.exports = router;
