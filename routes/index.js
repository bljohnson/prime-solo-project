var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// router.get('/', function(req, res) {
// 	console.log( 'in /');
// 	res.sendFile(path.resolve('public/views/index.html'));
// });

// handles login form POST
// router.post('/',
// 	passport.authenticate('local', {
// 		successRedirect: 'views/user.html',
// 		failureRedirect: 'views/failure.html'
// 	})
// ); // end post

module.exports = router;
