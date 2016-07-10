var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// handles login form POST
router.post('/',
	passport.authenticate('local', {
		successRedirect: 'views/user.html',
		failureRedirect: 'views/failure.html'
	})
); // end post

router.get('/', function(req, res) {
	res.sendFile(path.resolve('public/views/index.html'));
});

module.exports = router;
